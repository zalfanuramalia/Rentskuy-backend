const auth = require('express').Router();

const {login, register, forgotPass, verify} = require('../controllers/auth');

auth.post('/login', login);
auth.post('/register', register);
auth.post('/forgotPass', forgotPass);
auth.post('/verify', verify);

module.exports = auth;