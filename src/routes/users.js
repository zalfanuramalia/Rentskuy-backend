const users = require('express').Router();

const {dataUser, postUser, delUser, patchUser} = require('../controllers/users');

users.get('/', dataUser);
users.post('/', postUser);
users.delete('/:id', delUser);
users.patch('/:id', patchUser);

module.exports = users;