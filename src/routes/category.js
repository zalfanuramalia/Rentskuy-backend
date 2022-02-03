const category = require('express').Router();

const {categories, postCategories, delCategories, patchCategory} = require('../controllers/category');

category.get('/', categories);
category.post('/', postCategories);
category.delete('/:id', delCategories);
category.patch('/:id', patchCategory);

module.exports = category;
