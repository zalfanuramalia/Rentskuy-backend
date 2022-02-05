const historyModel = require('../models/history');

const dataHistory = (req, res) => {
    let { day, search, page, limit } = req.query;
    day = parseInt(day) || null;
    search = search || '';
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page - 1) * limit;
    const data = { day, search, limit, offset };
    historyModel.dataHistory(data, (result) => {
        historyModel.countHistory(data,(count) => {
            const { total } = count[0];
            const last = Math.ceil(total/limit);
            if (result.length> 0){
                return res.send({
                    success: true,
                    message: 'Data History',
                    result,
                    pageInfo: {
                        prev: page > 1 ? `http://localhost:3000/history?page=${page-1}`: null,
                        next: page < last ? `http://localhost:3000/history?page=${page+1}`: null,
                        totalData:total,
                        currentPage: page,
                        lastPage: last
                    }
                });
            } else {
                return res.status(404).send({
                    success: false,
                    message: 'There is no History'
                });
            }
        });
        
    });
};

const popularVehicles = (req, res) => {
    historyModel.popularVehicles((result) => {
        if (result.length> 0){
            return res.send({
                success: true,
                message: 'Most Popular Vehicles',
                result
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'There is no Popular Vehicles'
            });
        }
    });       
};

const popularBasedonDate = (req, res) => {
    let { day } = req.query; 
    day = parseInt(day) || null;
    const data = {day};
    if (!data){
        return res.status(400).send({
            success: false,
            message: 'This must be filled with number'
        });
    }
    historyModel.popularBasedonDate(data, (result) => {
        if (result.length > 0){
            return res.send({
                success: true,
                message: 'Popular Vehicles Based On Last 1 Month',
                result
            });
        } else {
            return res.status(400).send({
                success: false,
                message: 'Data must be number'
            });
        }
    });
};

const postHistory = (req, res) => {
    const data2 = {
        id: res.length + 1,
        id_users: parseInt(req.body.id_users),
        id_vehicles: parseInt(req.body.id_vehicles),
        returned: req.body.returned,
        new_arrival: req.body.new_arrival,
    };
    if (!data2.id_users && !data2.id_vehicles){
        return res.status(400).send({
            success: false,
            message: 'ID user and vehicles must be filled and number!'
        });
    }
    if (!data2.id_users){
        return res.status(400).send({
            success: false,
            message: 'ID user must be filled and number!'
        });
    }
    if (!data2.id_vehicles){
        return res.status(400).send({
            success: false,
            message: 'ID vehicles must be filled and number!'
        });
    }
    historyModel.postHistory(data2, (result) =>{
        if (result.affectedRows == 1){
            return res.send({
                success: true,
                message: 'History Posted',
                result: req.body
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'There is no history'
            });
        }
    }); 
};

const delHistory = (req, res) => {
    const dataID = parseInt(req.params.id);
    if (!dataID){
        return res.status(400).send({
            success: false,
            message: 'ID must be number!'
        });
    }
    const process = (result) => {
        if (result.affectedRows == 1){
            const ress = (result) =>{
                if(result.length > 0){
                    return res.status(500).send({
                        success: false,
                        message : 'Data History failed to Delete'
                    });
                    
                } else {
                    return res.send({
                        success: true,
                        message : 'History Delete'
                    });
                    
                }
            };
            historyModel.delHistory(dataID, ress);
        } else {
            return res.status(404).send({
                success: false,
                message: 'Data History not Found'
            });
        }
    };
    historyModel.delHistory(dataID, process);
};

const patchHistory = (req, res)=>{
    const dataID = parseInt(req.params.id);
    if (!dataID){
        return res.status(400).send({
            success: false,
            message: 'ID must be number!'
        });
    }
    const data = {
        id: res.length + 1,
        returned: req.body.returned,
        new_arrival: req.body.new_arrival,
    };
    const ress = (result) =>{
        if (result.affectedRows == 1){
            return res.send({
                success: true,
                message: 'Data History Updated',
                redult: req.body
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'Data History not Found with that ID'
            });
        }
        
    };
    historyModel.patchHistory(data, dataID, ress);  
};

module.exports = {popularVehicles, popularBasedonDate, postHistory, delHistory, patchHistory, dataHistory};