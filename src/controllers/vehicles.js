const vehicleModel = require('../models/vehicles');

const getVehicles = (req, res)=>{
    let { search, page, limit } = req.query;
    search = search || '';
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page - 1) * limit;
    const data = { search, limit, offset };
    vehicleModel.getVehicles(data, (result) =>{
        vehicleModel.countVehicles(data, (count) => {
            const { total } = count[0];
            const last = Math.ceil(total/limit);
            if (result.length > 0){
                return res.send({
                    success: true,
                    message: 'Data Vehicle Found',
                    result,
                    pageInfo: {
                        prev: page > 1 ? `http://localhost:3000/vehicles?page=${page-1}`: null,
                        next: page < last ? `http://localhost:3000/vehicles?page=${page+1}`: null,
                        totalData:total,
                        currentPage: page,
                        lastPage: last
                    }
                });
            } else {
                return res.status(404).send({
                    success: false,
                    message: 'Vehicle Not Found',
                    result,
                    pageInfo: {
                        prev: page > 1 ? `http://localhost:3000/vehicles?page=${page-1}`: null,
                        next: page < last ? `http://localhost:3000/vehicles?page=${page+1}`: null,
                        totalData:total,
                        currentPage: page,
                        lastPage: last
                    }
                });
            }    
        });
    });
};

const getVehicle = (req, res)=>{
    const dataID = parseInt(req.params.id);
    if (!dataID){
        return res.status(400).send({
            success: false,
            message: 'Data ID must be Number'
        });
    }
    if(dataID == ''){
        return res.status(400).send({
            success: false,
            message: 'ID is required'        
        });
    }
    vehicleModel.getVehicle(dataID, results => {
        if (results.length > 0){
            return res.send({
                success: true,
                message: 'List Detail Vehicle',
                results: results[0]
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'There is no Vehicles with that ID'
            });
        }        
    });
};

const patchVehicle = (req, res)=>{
    const dataID =parseInt(req.params.id);
    const data = {
        id: res.length + 1,
        category_id: req.body.category_id,
        brand: req.body.brand,
        location: req.body.location,
        can_prepayment: req.body.can_prepayment,
        isAvailable: req.body.isAvailable,
    };
    const img =  req.file;
    const upload = 'uploads/';
    const image = upload.concat(img);
    console.log(image);
    const price = parseInt(req.body.price) || null;
    const qty = parseInt(req.body.qty) || null;
    if (!dataID){
        return res.status(400).send({
            success: false,
            message: 'ID must be number!'
        });
    }
    if(!price && !qty){
        return res.status(400).send({
            success: false,
            message: 'Price and Quantity Data must be Number!'
        });
    }
    if(!price){
        return res.status(400).send({
            success: false,
            message: 'Price Data must be Number!'
        });
    }
    if(!qty){
        return res.status(400).send({
            success: false,
            message: 'Quantity Data must be Number!'
        });
    }
    vehicleModel.patchVehicle(image, price, qty, data, dataID, (result) =>{
        if (result.affectedRows == 1){
            vehicleModel.getPatchVehicle(dataID, (result) =>{
                return res.send({
                    success: true,
                    message: 'Data Updated',
                    result
                });
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'There is no Data with that ID',
            });          
        }   
    });
};

const delVehicle = (req, res) => {
    const dataID = parseInt(req.params.id) || null;
    if(!dataID){
        return res.status(400).send({
            success: false,
            message: 'ID must be Number!'
        });
    }
    vehicleModel.getDelVehicle(dataID, (result) => {
        vehicleModel.delVehicle(dataID, () => {
            if (result.affectedRows !== 1){
                vehicleModel.delVehicle(dataID, () => {
                    if(result.length > 0){
                        return res.send({
                            success: false,
                            message : 'Vehicle Data Success Deleted',
                            result
                        });
                    } else {
                        return res.status(404).send({
                            success: true,
                            message : 'Vehicle Data not Found',
                        });
                    }
                });
            } else {
                return res.status(500).send({
                    success: false,
                    message: 'Vehicle Data failed to Delete'
                });
            }
        });
    });
};

const postVehicle = (req, res) => {
    const price = parseInt(req.body.price) || null;
    const qty = parseInt(req.body.qty) || null;
    if(!price && !qty){
        return res.status(400).send({
            success: false,
            message: 'Price and Quantity Data must be Number!'
        });
    }
    if(!price){
        return res.status(400).send({
            success: false,
            message: 'Price Data must be Number!'
        });
    }
    if(!qty){
        return res.status(400).send({
            success: false,
            message: 'Quantity Data must be Number!'
        });
    }
    const data1 = {
        id: res.length + 1,
        category_id: parseInt(req.body.category_id),
        brand: req.body.brand,
        image: `uploads/${req.file.filename}`,
        location: req.body.location,
        can_prepayment: req.body.can_prepayment,
        isAvailable: req.body.isAvailable,
    };
    if(!data1.category_id){
        return res.status(400).send({
            success: false,
            message: 'ID category must be Number!'
        });
    }
    vehicleModel.postVehicle(price, qty, data1, (result) =>{
        if (result.affectedRows == 1){
            vehicleModel.getPostVehicle((result) => {
                return res.send({
                    success: true,
                    message: 'Data Posted',
                    result
                });
            });
        } else {
            return res.status(500).send({
                success: false,
                message: 'Data Vehicles not Posted'
            });
        }
    }); 
};

const vehiclesCategory = (req, res) => {
    const category = parseInt(req.params.category_id);
    if(!category){
        return res.status(400).send({
            success: false,
            message: 'ID Category must be Number!'
        });
    }
    vehicleModel.vehiclesCategory(category, results => {
        if (results.length > 0){
            return res.send({
                success: true,
                message: 'Data Category',
                results
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'There is Data Category Vehicles with that ID'
            });
        }        
    });
};

module.exports = {getVehicles, getVehicle, patchVehicle, delVehicle, postVehicle, vehiclesCategory};