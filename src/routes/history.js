const history = require('express').Router();
const cors = require('cors');

const {popularVehicles, popularBasedonMonth, postHistory, delHistory, patchHistory, dataHistory, detailHistory, detailHistoryUser} = require('../controllers/history');

history.get('/vehicles/createdAt', cors(),  popularBasedonMonth);
history.get('/vehicles', cors(), popularVehicles);
history.get('/', cors(), dataHistory);
history.get('/:id', cors(), detailHistory);
history.get('/users/:id', cors(),  detailHistoryUser);
history.post('/', cors(), postHistory);
history.delete('/:id', cors(), delHistory);
history.patch('/:id', cors(), patchHistory);

module.exports = history;