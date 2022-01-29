const history = require('express').Router();

const {postHistory, delHistory, patchHistory, dataHistory, popularHistory} = require('../controllers/history');

history.post('/', postHistory);
history.delete('/:id', delHistory);
history.patch('/:id', patchHistory);
history.get('/', dataHistory);
history.get('/', popularHistory);

module.exports = history;