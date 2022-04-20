const jwt = require('jsonwebtoken');
const { APP_SECRET } = process.env;
const response = require('../helpers/response');

exports.userVerify = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth.startsWith('Bearer')) {
    const token = auth.split(' ')[1];
    if (token) {
      try {
        const payload = jwt.verify(token, APP_SECRET);
        req.user = payload;
        if(payload.role=='Customer'){
          if (jwt.verify(token, APP_SECRET)) {
            return next();
          } else {
            return response(res, 'User not verified!', null, 403);
          }
        }else{
          return response(res, 'You must login as customer!', null, 403);
        }
      } catch (err) {
        return response(res, 'User not verified!', null, 403);
      }
    } else {
      return response(res, 'Token must be provided!', null, 403);
    }
  }
};

exports.adminVerify = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth.startsWith('Bearer')) {
    const token = auth.split(' ')[1];
    if (token) {
      try {
        const payload = jwt.verify(token, APP_SECRET);
        req.user = payload;
        if(payload.role=='Admin'){
          if (jwt.verify(token, APP_SECRET)) {
            return next();
          } else {
            return response(res, 'User not verified!', null, 403);
          }
        }else{
          return response(res, 'You must login as admin!', null, 403);
        }
      } catch (err) {
        return response(res, 'User not verified!', null, 403);
      }
    } else {
      return response(res, 'Token must be provided!', null, 403);
    }
  }
};

exports.allVerify = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth.startsWith('Bearer')) {
    const token = auth.split(' ')[1];
    if (token) {
      try {
        const payload = jwt.verify(token, APP_SECRET);
        req.user = payload;
        if (payload) {
          return next();
        } else {
          return res.status(403).json({
            success: false,
            message: 'User not verified!'
          });
        }
      } catch (err) {
        return res.status(403).json({
          success: false,
          message: 'User not verified!'
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