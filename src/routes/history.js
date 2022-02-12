const history = require('express').Router();

const {popularVehicles, popularBasedonMonth, postHistory, delHistory, patchHistory, dataHistory, detailHistory} = require('../controllers/history');
const {verifyUser} = require('../helpers/auth');

history.get('/vehicles/createdAt', verifyUser,  popularBasedonMonth);
history.get('/vehicles', verifyUser, popularVehicles);
history.get('/', verifyUser, dataHistory);
history.get('/:id', detailHistory);
history.post('/', postHistory);
history.delete('/:id', delHistory);
history.patch('/:id', patchHistory);

module.exports = history;