const users = require('express').Router();

const {dataUsers, dataUser, postUser, delUser, patchUser} = require('../controllers/users');

users.get('/', dataUsers);
users.get('/:id',dataUser);
users.post('/', postUser);
users.delete('/:id', delUser);
users.patch('/:id', patchUser);

module.exports = users;