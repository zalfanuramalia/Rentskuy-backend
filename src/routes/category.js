const category = require('express').Router();
const cors = require('cors');

const {categories, postCategories, delCategories, patchCategory} = require('../controllers/category');
// const {verifyUser} = require('../helpers/auth');

category.get('/', cors(), categories);
category.post('/',cors(), postCategories);
category.delete('/:id', delCategories);
category.patch('/:id', patchCategory);

module.exports = category;
