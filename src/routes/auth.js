const users = require('express').Router();

const {login, register, forgotPass, verify} = require('../controllers/auth');

users.post('/login', login);
users.post('/register', register);
users.post('/forgotPass', forgotPass);
users.post('/verify', verify);

module.exports = users;