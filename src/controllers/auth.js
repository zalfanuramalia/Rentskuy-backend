const userModel = require('../models/users');
const reqForgotModel = require('../models/forgotReq');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mail = require('../helpers/mail');
const response = require('../helpers/response');
const { APP_SECRET, APP_EMAIL } = process.env;


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userModel.userByUsername(email, null);
    if(result.length > 0){
      const {password: hash} = result[0];
      const fin = await bcrypt.compare(password, hash);
      if(fin){
        const data = { id: result[0].id, role: result[0].role };
        const token = jwt.sign(data, APP_SECRET);
        return response(res, 'Login Success!', {token}, 200);
      } else {
        return response(res, 'Wrong username or password!', null, 401);
      }
    } else {
      return response(res, 'Wrong username or password!', null, 401);
    }
  } catch (e) {
    return response(res, e.message, null, 500);
  }
};

exports.register = async (req, res) => {
  const { name, email, password:rawPassword } = req.body;
  const {id} = res.length + 1;
  const mail = await userModel.getUser({email});
  console.log(mail);
  if (mail.length < 1){
    const uname = await userModel.getUname({email});
    if (uname.length < 1){
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(rawPassword, salt);
      const result = await userModel.registerUser({id, name, email, password});
      await userModel.registerByUsername(email);
      if (result.affectedRows >= 1){
        return response(res, 'Register Success!', null, 200);
      } else {
        return response(res, 'Register Failed!', null, 500);
      }
    } else {
      return response(res, 'Username has been exist', null, 400);
    }
  } else {
    return response(res, 'Email has been exist', null, 400);
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
        return response(res, 'Forgot Password request has been sent to your email!', null, 200);
      } else {
        return response(res, 'Unexpected Error', null, 500);
      }
    } else {
      return response(res, 'If you registered, reset password code will sended to your email!', null, 200);
    }
  } else {
    if (email) {
      try {
        const result = await reqForgotModel.getRequest(code);
        if (result.length === 1) {
          if (result[0].isExpired) {
            return response(res, 'Expired code', null, 400);
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
                  return response(res, 'Password has been reset!', null, 200);
                } else {
                  return response(res, 'Unexpected Error', null, 500);
                }
              } else {
                return response(res, 'Confirm password not same as password', null, 400);
              }
            } else {
              return response(res, 'Password is mandatory!', null, 400);
            } 

          } else {
            return response(res, 'Invalid Email', null, 400);
          }
        } else {
          return response(res, 'Invalid code', null, 400);
        }
      }catch(err){
        return response(res, 'Error Email', null, 500);
      }
    } else {
      return response(res, 'You have to provide Confirmation Code', null, 400);
    }
  }
};

exports.verify = (req, res) => {
  const auth = req.headers.authorization;
  if (auth.startsWith('Bearer')) {
    const token = auth.split(' ')[1];
    if (token) {
      try {
        if (jwt.verify(token, APP_SECRET)) {
          return response(res, 'User Verify!', {token}, 200);
        } else {
          return response(res, 'User not Verify!', null, 400);
        }
      } catch (err) {
        return response(res, 'User not Verify!', null, 400);
      }
    } else {
      return response(res, 'Token must be provided!', null, 403);
    }
  }
};