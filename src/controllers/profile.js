const prof = require('../models/profile');
const userModel = require('../models/users');
const response = require('../helpers/response');

const getProfile = (req, res)=>{
  const {id} = req.user;
  console.log(id);
  prof.getProfile(id, (result)=>{
    if(result.length>0){
      return response(res, `User profile with ID: ${id}`, result[0], 200);
    }else{
      return response(res, `User with ID: ${id} not found`, null, 404);
    }
  });  
};

const updateProfile = async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id);
    const data = {    };
    // data["discount"] == data.discount
    const fillable = ['name', 'gender','email', 'address','number', 'birthdate'];
    fillable.forEach(field => {
      if (req.body[field]) {
        data[field] = req.body[field]; // data.qty = req.body.qty
      }
    });
    console.log(data);
    // const em = data.email.indexOf('@');
    // if (em < 1){
    //   return response(res, 'Enter email correctly', null, 400);
    // }
    const result = await userModel.dataUser(id);
    if (result.length >= 1) {      
      console.log(data);      
      try {
        const resultUpdate = await userModel.patchUser(data, id);
        if (resultUpdate.affectedRows) {
          const fetchNew = await userModel.dataUser(id);
          return response(res, 'Update Data Success!', fetchNew[0], 200);
        }
      } catch (err) {
        return response(res, 'Unexpected Error', null, 500);
      }
    } else {
      return response(res, 'Unexpected data', null, 400);
    }
  } catch (e) {
    return response(res, 'Unexpected data for update', null, 500);
  }
};

module.exports = {getProfile, updateProfile};