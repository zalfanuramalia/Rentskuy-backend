const history = require('express').Router();
const cors = require('cors');

const {popularVehicles, popularBasedonMonth, postHistory, delHistory, patchHistory, dataHistory, detailHistory, detailHistoryUser} = require('../controllers/history');
const {userVerify} = require('../helpers/auth');

history.get('/vehicles/createdAt', cors(),  popularBasedonMonth);
history.get('/vehicles', cors(), popularVehicles);
history.get('/', cors(), dataHistory);
history.get('/:id', cors(), detailHistory);
history.get('/users/:id', userVerify, cors(),  detailHistoryUser);
history.post('/', userVerify, cors(), postHistory);
history.delete('/:id', userVerify, cors(), delHistory);
history.patch('/:id', userVerify, cors(), patchHistory);

module.exports = history;