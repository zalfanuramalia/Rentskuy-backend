const categoryModel = require('../models/category');

const categories = (req, res)=>{
    categoryModel.categories((result) =>{
        if (result.length > 0){
            return res.send({
                success: true,
                message: 'Vehicles Categories',
                result,                    
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'Vehicle Categiroes Not Found',
            });
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
            return res.send({
                success: true,
                message: 'Data Posted',
                result
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'Data not Posted'
            });
        }
      
    }); 
};

const delCategories = (req, res) => {
    const {id} = req.params;
    const process = (result) => {
        if (result.affectedRows == 1){
            const ress = (result) =>{
                if(result.length > 0){
                    return res.status(500).send({
                        success: false,
                        message : 'Category Failed to Delete',
                        result
                    });
                } else {
                    return res.send({
                        success: true,
                        message : 'Category was Delete',
                        result
                    });
                }
            };
            categoryModel.delCategories( id, ress);
        } else {
            return res.status(404).send({
                success: false,
                message: 'There is no Category with that ID ',
                result
            });
        }
    };
    categoryModel.delCategories(id, process);
};

module.exports = {categories, postCategories, delCategories};