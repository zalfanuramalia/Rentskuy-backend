const categoryModel = require('../models/category');
const response = require('../helpers/response');

const categories = (req, res)=>{
  categoryModel.categories((result) =>{
    if (result.length > 0){
      return response(res, 'Vehicles Categories', result, 200);
    } else {
      return response(res, 'Vehicle Categiroes Not Found', null, 404);
    }    
  });
};

const postCategories = (req, res) => {
  const data = {
    id: res.length + 1,
    name: req.body.name
  };
  categoryModel.postCategories(data, (result) =>{    
    if (result.affectedRows == 1){
      categoryModel.detailCategories((results) =>{
        return response(res, 'Data Posted', results[0], 200);
      });
    } else {
      return response(res, 'Data not Posted', null, 404);
    }
  }); 
};

const delCategories = (req, res) => {
  const dataID = parseInt(req.params.id);
  if (!dataID){
    return response(res, 'ID must be number!', null, 400);
  }
  const process = (result) => {
    if (result.affectedRows == 1){
      const ress = (result) =>{
        if(result.length > 0){
          return response(res, 'Category Failed to Delete', result, 500);
        } else {
          return response(res, 'Category was Delete', result, 200);
        }
      };
      categoryModel.delCategories( dataID, ress);
    } else {
      return response(res, 'There is no Category with that ID ', null, 404);
    }
  };
  categoryModel.delCategories(dataID, process);
};

const patchCategory = (req, res)=>{
  const dataID = parseInt(req.params.id);
  if (!dataID){
    return response(res, 'ID must be number!', null, 400);
  }
  const data = {
    name: req.body.name,
  };
  const ress = (result) =>{
    if (result.affectedRows == 1){
      return response(res, 'Data Category Updated', req.body, 200);
    } else {
      return response(res, 'Data Category not Found', null, 404);
    }
      
  };
  categoryModel.patchCategory(data, dataID, ress);  
};

module.exports = {categories, postCategories, delCategories, patchCategory};