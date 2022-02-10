const vehicles = require('express').Router();

const {getVehicles, getVehicle, patchVehicle, delVehicle, postVehicle, vehiclesCategory} = require('../controllers/vehicles');
const {verifyUser} = require('../helpers/auth');

vehicles.get('/',verifyUser, getVehicles);
vehicles.post('/',verifyUser, postVehicle);
vehicles.get('/category/:category_id', vehiclesCategory);
vehicles.get('/:id',verifyUser, getVehicle);
vehicles.patch('/:id',verifyUser, patchVehicle);
vehicles.delete('/:id',verifyUser, delVehicle);

module.exports = vehicles;
