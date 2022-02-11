const vehicles = require('express').Router();

const {getVehicles, getVehicle, patchVehicle, delVehicle, postVehicle, vehiclesCategory} = require('../controllers/vehicles');
const {verifyUser} = require('../helpers/auth');

vehicles.get('/',verifyUser, getVehicles);
vehicles.post('/', postVehicle);
vehicles.get('/category/:category_id', verifyUser, vehiclesCategory);
vehicles.get('/:id',verifyUser, getVehicle);
vehicles.patch('/:id', patchVehicle);
vehicles.delete('/:id', delVehicle);

module.exports = vehicles;
