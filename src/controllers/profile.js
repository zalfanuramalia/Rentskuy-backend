const prof = require('../models/profile');

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
  
  // let {id} = req.params;
  // if(id==undefined || id==null || id==''){
  //   id = req.users.id;
  // }
  // if(id>0){
  //   prof.getProfile(id, result=>{
  //     if(result.length>0){
  //       return res.json({
  //         success: true,
  //         message: `User profile with ID: ${id}`,
  //         result: result
  //       });
  //     }else{
  //       return res.status(404).send({
  //         success: false,
  //         message: `User with ID: ${id} not found`
  //       });
  //     }
  //   });
  // }else{
  //   return res.status(400).send({
  //     success: false,
  //     message: 'ID should be a number greater than 0'
  //   });
  // }
  
};

module.exports = {getProfile};