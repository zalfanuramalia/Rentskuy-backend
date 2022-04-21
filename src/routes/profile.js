const profile = require('express').Router();

const {getProfile, updateProfile} = require('../controllers/profile');
const {allVerify} = require('../helpers/auth');

profile.get('/', allVerify, getProfile);
profile.patch('/:id', allVerify, updateProfile);

module.exports = profile;