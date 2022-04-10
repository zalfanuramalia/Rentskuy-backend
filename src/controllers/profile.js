const prof = require('../models/profile');
const userModel = require('../models/users');

const getProfile = (req, res)=>{
  const {id} = req.user;
  console.log(id);
  prof.getProfile(id, (result)=>{
    if(result.length>0){
      return res.json({
        success: true,
        message: `User profile with ID: ${id}`,
        result: result[0]
      });
    }else{
      return res.status(404).send({
        success: false,
        message: `User with ID: ${id} not found`
      });
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
    const em = data.email.indexOf('@');
    if (em < 1){
      return res.status(400).send({
        success: false,
        message: 'Enter email correctly'
      });
    }
    const result = await userModel.dataUser(id);
    if (result.length >= 1) {      
      console.log(data);      
      try {
        const resultUpdate = await userModel.patchUser(data, id);
        if (resultUpdate.affectedRows) {
          const fetchNew = await userModel.dataUser(id);
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
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: 'Unexpected data for update'
    });
    // console.log(e);
  }
};

module.exports = {getProfile, updateProfile};