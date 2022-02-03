const history = require('express').Router();

const {popularVehicles, postHistory, delHistory, patchHistory, dataHistory} = require('../controllers/history');

history.get('/vehicles', popularVehicles);
history.get('/', dataHistory);
history.post('/', postHistory);
history.delete('/:id', delHistory);
history.patch('/:id', patchHistory);


module.exports = history;