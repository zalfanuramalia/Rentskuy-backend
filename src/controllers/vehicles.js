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
    const dataID =req.params.id;
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
                message: 'There is no Vehicles'
            });
        }        
    });
};

const patchVehicle = (req, res)=>{
    const {id} =req.params;
    const data = {
        category_id: req.body.category_id,
        merk: req.body.merk,
        price: req.body.price,
        location: req.body.location,
        qyt: req.body.qyt,
        can_prepayment: req.body.can_prepayment,
        isAvailable: req.body.isAvailable,
        popularity: req.body.popularity
    };
    const ress = (result) =>{
        if (result.affectedRows == 1){
            return res.send({
                success: true,
                message: 'Data Updated',
                result: req.body
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'Data not Found'
            });
        }
        
    };
    vehicleModel.patchVehicle(data, id, ress);  
};

const delVehicle = (req, res) => {
    const {id} = req.params;
    const process = (result) => {
        if (result.affectedRows == 1){
            const ress = (result) =>{
                if(result.length > 0){
                    return res.status(500).send({
                        success: false,
                        message : 'Vehicle failed to Delete',
                        result
                    });
                } else {
                    return res.send({
                        success: true,
                        message : 'Vehicle was Delete',
                        result
                    });
                }
            };
            vehicleModel.delVehicle( id, ress);
        } else {
            return res.status(404).send({
                success: false,
                message: 'There is no Vehicles with that ID',
                result
            });            
        }
    };
    vehicleModel.delVehicle(id, process);
};

const postVehicle = (req, res) => {
    const data1 = {
        id: res.length + 1,
        category_id: req.body.category_id,
        merk: req.body.merk,
        price: req.body.price,
        location: req.body.location,
        qyt: req.body.qyt,
        can_prepayment: req.body.can_prepayment,
        isAvailable: req.body.isAvailable,
        popularity: req.body.popularity
    };
    vehicleModel.postVehicle(data1, (result) =>{
        if (result.affectedRows == 1){
            return res.send({
                success: true,
                message: 'Data Posted',
                result: req.body
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'Data not Posted'
            });
        }
        
    }); 
};

const vehiclesCategory = (req, res) => {
    const category= req.params.category_id;
    vehicleModel.vehiclesCategory(category, (result) =>{
        return res.send({
            success: true,
            message: 'Data Category',
            result
        });      
    }); 
    console.log(category);
};

module.exports = {getVehicles, getVehicle, patchVehicle, delVehicle, postVehicle, vehiclesCategory};