const userModel = require('../models/users');
const bcrypt = require('bcrypt');

const dataUsers = (req, res) => {
  let {search, page, limit } = req.query;
  search = search || '';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  const offset = (page - 1) * limit;
  const data = { search, page, limit, offset };
  if(data.limit < 0 && data.page < 0){
    return res.status(400).send({
      success: false,
      message: 'Page and Limit Must be More Than 0'
    });
  }
  if(data.limit < 0){
    return res.status(400).send({
      success: false,
      message: 'Limit Must be More Than 0'
    });
  }
  if(data.page < 0){
    return res.status(400).send({
      success: false,
      message: 'Page Must be More Than 0'
    });
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
        return res.status(404).send({
          success: false,
          message: 'Data Users not Found'
        });
      }
    });
  });
};

const dataUser = (req, res) => {
  const dataID =parseInt(req.params.id);
  if (!dataID){
    return res.status(400).send({
      success: false,
      message: 'ID must be number!'
    });
  }
  userModel.dataUser(dataID, (result) => {
    if (result.length > 0){
      return res.send({
        success: true,
        message: 'List Detail User',
        results: result[0]
      });
    } else {
      return res.status(404).send({
        success: false,
        message: 'User Not Found'
      });
    }
  });
};

const postUser = async (req, res) => {
  const { name, identity, gender, email, address, number, birthdate, username, password: rawPassword } = req.body;
  const {id} = res.length + 1;
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(rawPassword, salt);
  if(!identity){
    return res.status(400).send({
      success: false,
      message: 'Identity must be number!'
    });
  }
  const result = await userModel.postUser({id, name, identity, gender, email, address, number, birthdate, username, password});
  const get = await userModel.getPostUser();
  if (result.affectedRows >= 1){
    return res.send({
      success: true,
      message: 'Data User Posted',
      result: get
    });
  } else {
    return res.status(500).send({
      success: false,
      message: 'Data not Posted'
    });
  }
};

const delUser = (req, res) => {
  const dataID = parseInt(req.params.id);
  if(!dataID){
    return res.status(400).send({
      success: false,
      message: 'ID must be number!'
    });
  }    
  const process = (result) => {
    if (result.affectedRows == 1){
      const ress = (result) =>{
        if(result.length > 0){
          return res.status(500).send({
            success: false,
            message : 'User failed to Delete',
            result
          });
        } else {
          return res.send({
            success: true,
            message : 'User was Delete',
            result
          });
        }
      };
      userModel.delUser( dataID, ress);
    } else {
      return res.status(404).send({
        success: false,
        message: 'There is no User with that ID ',
        result
      });
    }
  };
  userModel.delUser(dataID, process);
};

const patchUser = async (req, res)=>{
  const dataID = parseInt(req.params.id);
  if(!dataID){
    return res.status(400).send({
      success: false,
      message: 'ID must be number!'
    });
  }
  const result = await userModel.dataUser(dataID);
  if (result.length >= 1) {
    const data = {    };
    // data["discount"] == data.discount
    const fillable = ['name', 'identity', 'gender','email', 'address','number', 'birthdate'];
    fillable.forEach(field => {
      if (req.body[field]) {
        return data[field] = req.body[field]; // data.qty = req.body.qty
      }
    });
    console.log(data);
    try {
      const resultUpdate = await userModel.patchUser(data, dataID);
      if (resultUpdate.affectedRows) {
        const fetchNew = await userModel.dataUser(dataID);
        return res.json({
          success: true,
          message: 'Update Data Success!',
          result: fetchNew[0]
        });
      }
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: 'Unexpected Error'
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: 'Unexpected data'
    });
  }
  // const em = data.email.indexOf('@');
  // if (em < 1){
  //   return res.status(400).send({
  //     success: false,
  //     message: 'Enter email correctly'
  //   });
  // }
  // if(!data.identity){
  //   return res.status(400).send({
  //     success: false,
  //     message: 'Identity must be number!'
  //   });
  // }
};


module.exports = {dataUsers, dataUser, postUser, delUser, patchUser};