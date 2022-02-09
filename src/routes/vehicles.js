const vehicles = require('express').Router();

const {getVehicles, getVehicle, patchVehicle, delVehicle, postVehicle, vehiclesCategory} = require('../controllers/vehicles');

vehicles.get('/', getVehicles);
vehicles.post('/', postVehicle);
vehicles.get('/category/:category_id', vehiclesCategory);
vehicles.get('/:id', getVehicle);
vehicles.patch('/:id', patchVehicle);
// vehicles.patch('/:id', patchVehicleAsync);
vehicles.delete('/:id', delVehicle);

module.exports = vehicles;
