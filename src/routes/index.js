const route = require ('express').Router();

route.use('/vehicles',require('./vehicles'));

route.use('/users', require('./users'));

route.use('/history', require('./history'));

route.use('/category', require('./category'));

route.use('/auth', require('./auth'));

module.exports = route;
