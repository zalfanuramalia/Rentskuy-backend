const vehicles = require('express').Router();
const cors = require('cors');

const {getVehicles, getVehicle, patchVehicle, updateVehicle, delVehicle, postVehicle, vehiclesCategory, vehiclesOnLocation} = require('../controllers/vehicles');
// const {verifyUser} = require('../helpers/auth');

vehicles.get('/', cors(),  getVehicles);
vehicles.post('/', cors(), postVehicle);
vehicles.get('/category/:category_id', cors(),  vehiclesCategory);
vehicles.get('/:id', cors(), getVehicle);
vehicles.patch('/category/:id', cors(), updateVehicle);
vehicles.patch('/:id', cors(), patchVehicle);
vehicles.delete('/:id',cors(), delVehicle);
vehicles.get('/location/:location', cors(), vehiclesOnLocation);

module.exports = vehicles;
