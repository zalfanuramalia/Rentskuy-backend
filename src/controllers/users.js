const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const upload = require('../helpers/upload').single('image');
const response = require('../helpers/response');
// var validator = require('validator');
const fs = require('fs');
const { cloudPath, imageDeleted } = require('../helpers/imageDeleted');

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
            prev: page > 1 ? `https://rentskuy.herokuapp.com/history?page=${page-1}`: null,
            next: page < last ? `https://rentskuy.herokuapp.com/history?page=${page+1}`: null,
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
  try {
    req.fileUpload = 'users';
    upload(req, res, async function(err){      
      const { name, identity, gender, email, address, number, birthdate, username, password: rawPassword, image, role } = req.body;
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(rawPassword, salt);
      const data = { name, identity, gender, email, address, number, birthdate, username, password, image, role};
      if(req.file){
        var imageTemp = req.file.path;
        data.image = imageTemp.replace('\\', '/');
      }
      if (err){
        return response(res, err.message,  null, 400);
      }
      if(isNaN(identity)===true){
        return response(res, 'Identity must be number!', null, 400);
      }
      const result = await userModel.postUser(data);
      const get = await userModel.getPostUser(email);
      if (result.affectedRows >= 1){
        
        const mapResults = get.map(o => {
          if(o.image!== null){
            o.image = `${o.image}`;
          }
          return o;
        });
        return response(res, 'Data User Posted', mapResults[0], 200);
      } else {
        return response(res, 'Data not Posted', null, 500);
      }
    });
  } catch (e) {
    return response(res, e.message, null, 500);
  }
};

const delUser = async (req, res) => {
  try {
    upload(req, res, async function () {
      const dataID = parseInt(req.params.id);
      if (isNaN(dataID)===true){
        return response(res, 'Data ID must be Number', null, 400);
      }
      const process = await userModel.dataUser(dataID);
      if (process.length > 0) {
        if (process[0].image !== null) {
          const fileName = cloudPath(process[0].image);
          await imageDeleted(fileName);
        } else {
          fs.rm(process[0].image, {}, function(err) {
            if (err) {
              return response(res, 'File image not found!', null, 404);
            }
          });
        }
        const ress = await userModel.delUser(dataID);
        if(ress.affectedRows > 0) {
          return response(res, 'User was Delete', process, 200);
        } else {
          return response(res, 'User data failed to delete!', null, 500);
        }
      } else {
        return response(res, 'Data not Found', null, 404);
      }
    });
  } catch (e) {
    return response(res, e.message, null, 500);
  }
};

const patchUser = async (req, res)=>{
  try {
    req.fileUpload = 'users';
    upload (req, res, async function(err){
      
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
          var imageTemp = req.file.path;
          data.image = imageTemp.replace('\\', '/');
        }

        if (err){
          return response(res, err.message,  null, 400);
        }
        
        // if (data.email) {
        //   const em = validator.isEmail(data.email);
        //   if (!em){
        //     return response(res, 'Enter email correctly', null, 400);
        //   }
        // }
        try {
          const resultUpdate = await userModel.patchUser(data, dataID);
          if (resultUpdate.affectedRows) {
            const fetchNew = await userModel.dataUser(dataID);
            console.log(fetchNew);
            const mapResults = fetchNew.map(o => {
              if(o.image!== null){
                o.image = `${o.image}`;
              }
              return o;
            });
            return response(res, 'Update Data Success!', mapResults[0], 200);
          }
        } catch (err) {
          return response(res, 'Unexpected Error', null, 500);
        }
      } else {
        return response(res, 'Unexpected data', null, 400);
      }
    });
  } catch (e) {
    return response(res, e.message, null, 500);
  }
};


module.exports = {dataUsers, dataUser, postUser, delUser, patchUser};