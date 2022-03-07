const searchVehicle = require('express').Router();
const cors = require('cors');

const { getSearch } = require('../controllers/search');
searchVehicle.get('/:category_id', cors(), getSearch);

module.exports = searchVehicle;