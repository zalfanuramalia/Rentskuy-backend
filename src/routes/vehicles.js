const vehicles = require('express').Router();

const {getVehicles, getVehicle, patchVehicle, delVehicle, postVehicle, vehiclesCategory} = require('../controllers/vehicles');
const upload = require('../helpers/upload');

vehicles.get('/', getVehicles);
vehicles.post('/', upload.single('image'), postVehicle);
vehicles.get('/category/:category_id', vehiclesCategory);
vehicles.get('/:id', getVehicle);
vehicles.patch('/:id', patchVehicle);
vehicles.delete('/:id', delVehicle);

module.exports = vehicles;
