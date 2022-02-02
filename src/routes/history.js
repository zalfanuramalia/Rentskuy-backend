const history = require('express').Router();

const {postHistory, delHistory, patchHistory, dataHistory} = require('../controllers/history');

history.post('/', postHistory);
history.delete('/:id', delHistory);
history.patch('/:id', patchHistory);
history.get('/', dataHistory);


module.exports = history;