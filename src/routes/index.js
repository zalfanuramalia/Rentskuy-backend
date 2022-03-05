const route = require ('express').Router();

route.use('/vehicles',require('./vehicles'));

route.use('/users', require('./users'));

route.use('/history', require('./history'));

route.use('/category', require('./category'));

route.use('/auth', require('./auth'));

route.use('/profile', require('./profile'));

route.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Backend is running well!'
  });
});

module.exports = route;
