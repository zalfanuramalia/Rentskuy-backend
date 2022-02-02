const vehicles = require('express').Router();

const {getVehicles, getVehicle, patchVehicle, delVehicle, postVehicle, vehiclesCategory} = require('../controllers/vehicles');

vehicles.get('/', getVehicles);
vehicles.get('/:id', getVehicle);
vehicles.patch('/:id', patchVehicle);
vehicles.delete('/:id', delVehicle);
vehicles.post('/', postVehicle);
vehicles.get('/:category_id', vehiclesCategory);

module.exports = vehicles;
