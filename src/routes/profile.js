const profile = require('express').Router();

const {getProfile, updateProfile} = require('../controllers/profile');
const {verifyUser} = require('../helpers/auth');

profile.get('/',verifyUser, getProfile);
profile.patch('/:id', updateProfile);

module.exports = profile;