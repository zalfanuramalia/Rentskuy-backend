const route = require ('express').Router();

route.use('/vehicles',require('./vehicles'));

route.use('/users', require('./users'));

route.use('/history', require('./history'));

module.exports = route;
