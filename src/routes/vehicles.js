const vehicles = require('express').Router();
const cors = require('cors');

const {getVehicles, getVehicle, patchVehicle, updateVehicle, delVehicle, postVehicle, vehiclesCategory, vehiclesOnLocation} = require('../controllers/vehicles');
const {adminVerify} = require('../helpers/auth');

vehicles.get('/', cors(),  getVehicles);
vehicles.post('/', cors(), postVehicle);
vehicles.get('/category/:category_id', cors(),  vehiclesCategory);
vehicles.get('/:id', cors(), getVehicle);
vehicles.patch('/category/:id', adminVerify, cors(), updateVehicle);
vehicles.patch('/:id', adminVerify, cors(), patchVehicle);
vehicles.delete('/:id',adminVerify, cors(), delVehicle);
vehicles.get('/location/:location', cors(), vehiclesOnLocation);

module.exports = vehicles;
