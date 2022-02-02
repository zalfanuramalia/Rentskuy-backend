const category = require('express').Router();

const {categories, postCategories, delCategories} = require('../controllers/category');

category.get('/', categories);
category.post('/', postCategories);
category.delete('/:id', delCategories);

module.exports = category;
