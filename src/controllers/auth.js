const userModel = require('../models/users');
const reqForgotModel = require('../models/forgotReq');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mail = require('../helpers/mail');
const { APP_SECRET, APP_EMAIL } = process.env;


exports.login = async (req, res) => {
  const { username, password } = req.body;
  const result = await userModel.userByUsername(username);
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

exports.register = async (req, res) => {
  const { name, email, username, password:rawPassword } = req.body;
  const {id} = res.length + 1;
  const mail = await userModel.getUser({email});
  console.log(mail);
  if (mail.length < 1){
    const uname = await userModel.getUname({username});
    if (uname.length < 1){
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(rawPassword, salt);
      const result = await userModel.registerUser({id, name, email, username, password});
      await userModel.registerByUsername(username);
      if (result.affectedRows >= 1){
        return res.send({
          success: true,
          message: 'Register Success!'
        });
      } else {
        return res.status(500).send({
          success: false,
          message: 'Register Failed!'
        });
      }
    } else {
      return res.status(400).send({
        success: false,
        message: 'Username has been exist'
      });
    }
  } else {
    return res.status(400).send({
      success: false,
      message: 'Email has been exist'
    });
  }
};

exports.forgotPass = async (req, res) => {
  const { email, code, password, confirmPass } = req.body;
  if (!code) {
    const user = await userModel.registerByUsername(email);
    if (user.length === 1) {
      const randomCode = Math.floor(Math.pow(10, 6-1) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 6-1) - 1));
      const reset = await reqForgotModel.createRequest(user[0].id, randomCode);
      if (reset.affectedRows >= 1) {
        await mail.sendMail({
          from: APP_EMAIL,
          to: email,
          subject: 'Reset Your Password | Vehicles Rent',
          text: String(randomCode),
          html: `<b>Your Code for Reset Password is ${randomCode}</b>`
        });
        return res.send({
          success: true,
          message: 'Forgot Password request has been sent to your email!',
        });
      } else {
        return res.status(500).send({
          success: true,
          message: 'Unexpected Error',
        });
      }
    } else {
      return res.send({
        success: true,
        message: 'If you registered, reset password code will sended to your email!',
      });
    }
  } else {
    if (email) {
      try {
        const result = await reqForgotModel.getRequest(code);
        if (result.length === 1) {
          if (result[0].isExpired) {
            return res.status(400).send({
              success: true,
              message: 'Expired code',
            });
          }
          const user = await reqForgotModel.getUser(result[0].id_user);
          if (user[0].email === email) {
            if (password) {
              if (password === confirmPass) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
                const update = await userModel.updateUser({ password: hash }, user[0].id);
                if (update.affectedRows === 1) {
                  await reqForgotModel.updateRequest({ isExpired: 1 }, result[0].id);
                  return res.send({
                    success: true,
                    message: 'Password has been reset!',
                  });
                } else {
                  return res.status(500).send({
                    success: true,
                    message: 'Unexpected Error',
                  });
                }
              } else {
                return res.status(400).send({
                  success: true,
                  message: 'Confirm password not same as password',
                });
              }
            } else {
              return res.status(400).send({
                success: true,
                message: 'Password is mandatory!',
              });
            } 

          } else {
            console.log(user);
            return res.status(400).send({
              success: true,
              message: 'Invalid Email',
            });
          }
        } else {
          return res.status(400).send({
            success: true,
            message: 'Invalid code',
          });
        }
      }catch(err){
        console.log(err);
      }
    } else {
      return res.status(400).send({
        success: true,
        message: 'You have to provide Confirmation Code',
      });
    }
  }
};

exports.logout = async (req, res) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      if (token){
        const fin = jwt.verify(token, APP_SECRET, { expiresIn: 0.06 * 60 });
        console.log(fin);
        return res.json({
          success: true,
          message: 'Logout Successfully'
        });
      } else {
        return res.status(422).json({
          success: true,
          message: 'Token required'
        });
      } 
    }
  } catch (error) {
    return res.status(422).json({
      success: false,
      message: 'Token not Found'
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
            success: false,
            message: 'User not Verify!',
            result: {token}
          });
        }
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: 'User not Verify!',
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: 'Token must be provided!'
      });
    }
  }
};