const auth = require('express').Router();

const {login, register, forgotPass, logout, verify} = require('../controllers/auth');

auth.post('/login', login);
auth.post('/register', register);
auth.post('/forgotPass', forgotPass);
auth.post('/logout', logout);
auth.post('/verify', verify);

module.exports = auth;