const category = require('express').Router();
const cors = require('cors');

const {categories, postCategories, delCategories, patchCategory} = require('../controllers/category');
const {adminVerify} = require('../helpers/auth');

category.get('/', adminVerify, cors(), categories);
category.post('/', adminVerify, cors(), postCategories);
category.delete('/:id', adminVerify, delCategories);
category.patch('/:id', adminVerify, patchCategory);

module.exports = category;
