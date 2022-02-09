const vehicleModel = require('../models/vehicles');
const {APP_URL} = process.env;
const upload = require('../helpers/upload').single('image');
// const fs = require('fs');

const getVehicles = (req, res)=>{
    let { search, page, limit } = req.query;
    search = search || '';
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page - 1) * limit;
    const data = { search, limit, offset };
    vehicleModel.getVehicles(data, (result) =>{
        const processedResult = result.map((obj) => {
            if(obj.image !== null){
                obj.image = `${APP_URL}/${obj.image}`;
            }
            return obj;
        });
        console.log(processedResult);
        vehicleModel.countVehicles(data, (count) => {
            const { total } = count[0];
            const last = Math.ceil(total/limit);
            if (result.length > 0){
                return res.send({
                    success: true,
                    message: 'Data Vehicle Found',
                    result: processedResult,
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
        const processedResult = results.map((obj) => {
            if(obj.image !== null){
                obj.image = `${APP_URL}/${obj.image}`;
            }
            return obj;
        });
        console.log(processedResult);
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

// const patchVehicleAsync = async(req, res)=> {
//     const dataID= req.params.id;
//     const result = await vehicleModel.getPatchVehicleAsync(dataID);
//     if(result.length >= 1){
//         const data = {   };
//         const fillable = ['category_id','brand','image','price','location','qty','can_prepayment','isAvailable'];
//         const fin = fillable.forEach(field => {
//             if(req.body[field]){
//                 data[field] = req.body[field]; // data.qty = req.body.qty
//             }
//         });
//         console.log(fin);
//         try{
//             const resultUpdate = await vehicleModel.patchVehicleAsync(data, dataID);
//             if(resultUpdate.affectedRows == 1){
//                 const fetchNew = await vehicleModel.getPatchVehicleAsync(dataID);
//                 return res.json({
//                     success: true,
//                     message: 'Update Data Success',
//                     result: fetchNew[0]
//                 });
//             }
//         }catch(err){
//             return res.status(500).json({
//                 success: false,
//                 message: 'Unexpected Error'
//             });
//         }
//     }else{
//         return res.status(400).json({
//             success: false,
//             message: 'Unexpected data'
//         });
//     }
// };

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
    upload(req, res, function(err){
        if(err){
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        const data1 = {
            id: res.length + 1,
            category_id: parseInt(req.body.category_id),
            brand: req.body.brand,
            price: parseInt(req.body.price),
            location: req.body.location,
            qty: parseInt(req.body.qty),
            can_prepayment: req.body.can_prepayment,
            isAvailable: req.body.isAvailable,
        };
        if(req.file){
            data1.image = `uploads/${req.file.filename}`;
        }
        if(!data1.price && !data1.qty){
            return res.status(400).send({
                success: false,
                message: 'Price and Quantity Data must be Number!'
            });
        }
        if(!data1.price){
            return res.status(400).send({
                success: false,
                message: 'Price Data must be Number!'
            });
        }
        if(!data1.qty){
            return res.status(400).send({
                success: false,
                message: 'Quantity Data must be Number!'
            });
        }
        if(!data1.category_id){
            return res.status(400).send({
                success: false,
                message: 'ID category must be Number!'
            });
        }
        vehicleModel.postVehicle(data1, (results)=>{
            if (results.affectedRows == 1){
                vehicleModel.getVehicle(results.insertId, (fin)=> {
                    const mapResults = fin.map(o => {
                        if(o.image!== null){
                            o.image = `${APP_URL}/${o.image}`;
                        }
                        return o;
                    });
                    return res.send({
                        success: true,
                        message: 'Vehicle data created!',
                        results: mapResults[0]
                    });
                });
            } else {
                return res.status(400).send({
                    success: false,
                    message: 'Unexpected Data'
                });
            }
        });
    });
};

const patchVehicle = (req, res)=>{
    upload(req, res, function(err){
        if(err){
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        const dataID = parseInt(req.params.id);
        if (!dataID){
            return res.status(400).send({
                success: false,
                message: 'ID must be number!'
            });
        }
        vehicleModel.getPatchVehicle(dataID, (result) => {
            if (result.length >=1){
                const data = {
                    id: res.length + 1,
                    category_id: parseInt(req.body.category_id),
                    brand: req.body.brand,
                    price: parseInt(req.body.price),
                    location: req.body.location,
                    qty: parseInt(req.body.qty),
                    can_prepayment: req.body.can_prepayment,
                    isAvailable: req.body.isAvailable,
                };
                if(req.file){
                    data.image = `uploads/${req.file.filename}`;
                }
                if(!data.price && !data.qty){
                    return res.status(400).send({
                        success: false,
                        message: 'Price and Quantity Data must be Number!'
                    });
                }
                if(!data.price){
                    return res.status(400).send({
                        success: false,
                        message: 'Price Data must be Number!'
                    });
                }
                if(!data.qty){
                    return res.status(400).send({
                        success: false,
                        message: 'Quantity Data must be Number!'
                    });
                }
                if(!data.category_id){
                    return res.status(400).send({
                        success: false,
                        message: 'ID category must be Number!'
                    });
                }
                vehicleModel.patchVehicle(data, dataID, (result) =>{
                    if (result.affectedRows == 1){
                        vehicleModel.getPatchVehicle(dataID, (fin) =>{
                            const mapResult = fin.map(o => {
                                if(o.image!== null){
                                    o.image = `${APP_URL}/${o.image}`;
                                }
                                return o;
                            });
                            return res.send({
                                success: true,
                                message: 'Update Vehicle Data Success!',
                                results: mapResult[0]
                            });
                        });
                    } else {
                        return res.status(404).send({
                            success: false,
                            message: 'Unexpected Error!',
                        });          
                    }   
                });
            } else {
                return res.status(404).send({
                    success: false,
                    message: 'Unexpected Data'
                });
            }   
        });
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