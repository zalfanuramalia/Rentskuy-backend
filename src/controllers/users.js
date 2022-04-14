const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const upload = require('../helpers/upload').single('image');
const {APP_URL} = process.env;
const response = require('../helpers/response');

const dataUsers = (req, res) => {
  let {search, page, limit } = req.query;
  search = search || '';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  const offset = (page - 1) * limit;
  const data = { search, page, limit, offset };
  if(data.limit < 0 && data.page < 0){
    return response(res, 'Page and Limit Must be More Than 0', null, 400);
  }
  if(data.limit < 0){
    return response(res, 'Limit Must be More Than 0', null, 400);
  }
  if(data.page < 0){
    return response(res, 'Page Must be More Than 0', null, 400);
  }
  userModel.dataUsers(data, (result) => {
    userModel.countUsers(data,(count) => {
      const { total } = count[0];
      const last = Math.ceil(total/limit);
      if (result.length > 0){
        return res.send({
          success: true,
          message: 'Data Users',
          result,
          pageInfo: {
            prev: page > 1 ? `http://localhost:3000/history?page=${page-1}`: null,
            next: page < last ? `http://localhost:3000/history?page=${page+1}`: null,
            totalData:total,
            currentPage: page,
            lastPage: last
          }
        });
      } else {
        return response(res, 'Data Users not Found', null, 404);
      }
    });
  });
};

const dataUser = (req, res) => {
  const dataID =parseInt(req.params.id);
  if (isNaN(dataID)===true){
    return response(res, 'Data ID must be Number', null, 400);
  }
  userModel.dataUser(dataID, (result) => {
    if (result.length > 0){
      return response(res, 'List Detail User',  result[0], 200);
    } else {
      return response(res, 'User Not Found',  null, 404);
    }
  });
};

const postUser = async (req, res) => {
  upload(req, res, async function(err){
    if (err){
      return response(res, err.message,  null, 400);
    }
    const { name, identity, gender, email, address, number, birthdate, username, password: rawPassword } = req.body;
    const {id} = res.length + 1;
    const salt = await bcrypt.genSalt(10);
    const passwords = await bcrypt.hash(rawPassword, salt);
    const data = { name, identity, gender, email, address, number, birthdate, username, passwords};
    if(req.file){
      data.image = `uploads/${req.file.filename}`;
    }
    if(isNaN(identity)===true){
      return response(res, 'Identity must be number!', null, 400);
    }
    const result = await userModel.postUser({id, data});
    const get = await userModel.getPostUser();
    if (result.affectedRows >= 1){
      return response(res, 'Data User Posted', get, 200);
    } else {
      return response(res, 'Data not Posted', null, 500);
    }
  });
};

const delUser = (req, res) => {
  const dataID = parseInt(req.params.id);
  if (isNaN(dataID)===true){
    return response(res, 'Data ID must be Number', null, 400);
  }   
  const process = (result) => {
    if (result.affectedRows == 1){
      const ress = (result) =>{
        if(result.length > 0){
          return response(res, 'User failed to Delete', result, 500);
        } else {
          return response(res, 'User was Delete', result, 200);
        }
      };
      userModel.delUser( dataID, ress);
    } else {
      return response(res, 'There is no User with that ID ', null, 404);
    }
  };
  userModel.delUser(dataID, process);
};

const patchUser = async (req, res)=>{
  upload (req, res, async function(err){
    if (err){
      return response(res, err.message,  null, 400);
    }
    const dataID = parseInt(req.params.id);
    if (isNaN(dataID)===true){
      return response(res, 'Data ID must be Number', null, 400);
    }
    const result = await userModel.dataUser(dataID);
    if (result.length >= 1) {
      const data = {    };
      const fillable = ['name', 'gender','email', 'address','number', 'birthdate'];
      fillable.forEach(field => {
        if (req.body[field]) {
          return data[field] = req.body[field]; // data.qty = req.body.qty
        }
      });
      
      if(req.file){
        data.image = `uploads/${req.file.filename}`;
      }
      console.log(req.body, req.file);
      console.log(data);
      const em = data.email.indexOf('@');
      if (em < 1){
        return response(res, 'Enter email correctly', null, 400);
      }
      try {
        const resultUpdate = await userModel.patchUser(data, dataID);
        if (resultUpdate.affectedRows) {
          const fetchNew = await userModel.dataUser(dataID);
          console.log(fetchNew);
          const mapResults = fetchNew.map(o => {
            if(o.image!== null){
              o.image = `${APP_URL}/${o.image}`;
            }
            return o;
          });
          return response(res, 'Update Data Success!', mapResults[0], 200);
        }
      } catch (err) {
        // console.log(err);
        return response(res, 'Unexpected Error', null, 500);
      }
    } else {
      return response(res, 'Unexpected data', null, 400);
    }
  });
};


module.exports = {dataUsers, dataUser, postUser, delUser, patchUser};