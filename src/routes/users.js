const users = require('express').Router();

const {dataUsers, dataUser, postUser, delUser, patchUser} = require('../controllers/users');
const {verifyUser} = require('../helpers/auth');

users.get('/',verifyUser, dataUsers);
users.get('/:id',verifyUser, dataUser);
users.post('/', postUser);
users.delete('/:id', delUser);
users.patch('/:id', patchUser);

module.exports = users;