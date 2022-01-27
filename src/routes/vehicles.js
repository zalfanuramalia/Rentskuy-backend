const vehicles = require('express').Router();

const {getVehicles, getVehicle, patchVehicle, delVehicle, postVehicle} = require('../controllers/vehicles');

vehicles.get('/', getVehicles);
vehicles.get('/:id', getVehicle);
vehicles.patch('/:id', patchVehicle);
vehicles.delete('/:id', delVehicle);
vehicles.post('/', postVehicle);

module.exports = vehicles;
