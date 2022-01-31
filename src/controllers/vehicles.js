const vehicleModel = require('../models/vehicles');

const getVehicles = (req, res)=>{
    let { search, page, limit } = req.query;
    search = search || '';
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page - 1) * limit;
    const data = { search, limit, offset };
    vehicleModel.getVehicles(data, (result) =>{
        if (result.length > 0){
            return res.send({
                success: true,
                message: 'Data Vehicle Found',
                result
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'Vehicle Not Found'
            });
        }
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
                message: 'Vehicle Not Found'
            });
        }        
    });
};

const patchVehicle = (req, res)=>{
    const {id} =req.params;
    const data = {
        merk: req.body.merk,
        price: req.body.price,
        location: req.body.location,
        capacity: req.body.capacity,
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
        merk: req.body.merk,
        price: req.body.price,
        location: req.body.location,
        capacity: req.body.capacity,
        can_prepayment: req.body.can_prepayment,
        isAvailable: req.body.isAvailable,
        reservation: req.body.reservation,
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

module.exports = {getVehicles, getVehicle, patchVehicle, delVehicle, postVehicle};