const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const {APP_SECRET} = process.env;


exports.login = async (req, res) => {
  const { username, password } = req.body;
  const result = await userModel.userByUsername(username);
  console.log(result);
  if(result.length === 1){
    const {password: hash} = result[0];
    const fin = await bcrypt.compare(password, hash);
    if(fin){
      const token = jwt.sign({id: result[0].id}, APP_SECRET);
      return res.json({
        success: true,
        message: 'Login Success!',
        result: {token}
      });
    } else {
      return res.status(403).json({
        success: false,
        message: 'Wrong username or password!'
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      message: 'Wrong username or password!'
    });
  }
};

exports.verify = (req, res) => {
  const auth = req.headers.authorization;
  if (auth.startsWith('Bearer')) {
    const token = auth.split(' ')[1];
    if (token) {
      try {
        if (jwt.verify(token, APP_SECRET)) {
          return res.json({
            success: true,
            message: 'User Verify!',
            result: {token}
          });
        } else {
          return res.json({
            success: true,
            message: 'User not Verify!',
            result: {token}
          });
        }
      } catch (err) {
        return res.status(400).json({
          success: true,
          message: 'Token must be provided',
          result: {token}
        });
      }
    }
  }
};