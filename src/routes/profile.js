const profile = require('express').Router();

const {getProfile, updateProfile} = require('../controllers/profile');

profile.get('/', getProfile);
profile.patch('/:id', updateProfile);

module.exports = profile;