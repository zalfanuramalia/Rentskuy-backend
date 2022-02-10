const historyModel = require('../models/history');
const {APP_URL} = process.env;

const dataHistory = (req, res) => {
    let {search, page, limit, all, sort} = req.query;
    search = search || '';
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    all = all || '';
    sort = sort || '';
    const offset = (page - 1) * limit;
    const data = { search, page, limit, offset, all, sort };
    if(data.limit < 0 && data.page < 0){
        return res.status(400).send({
            success: false,
            message: 'Page and Limit Must be More Than 0'
        });
    }
    if(data.limit < 0){
        return res.status(400).send({
            success: false,
            message: 'Limit Must be More Than 0'
        });
    }
    if(data.page < 0){
        return res.status(400).send({
            success: false,
            message: 'Page Must be More Than 0'
        });
    }
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
                return res.status(400).send({
                    success: false,
                    message: 'You must input correctly',
                    pageInfo: {
                        prev: page > 1 ? `http://localhost:3000/history?page=${page-1}`: null,
                        next: page < last ? `http://localhost:3000/history?page=${page+1}`: null,
                        totalData:total,
                        currentPage: page,
                        lastPage: last
                    }
                });
            }
        });
        
    });
};

const detailHistory = (req, res)=>{
    const dataID = parseInt(req.params.id);
    if (!dataID){
        return res.status(400).send({
            success: false,
            message: 'Data ID must be Number'
        });
    }
    historyModel.detailHistory(dataID, (results) => {
        if (results.length > 0){
            return res.send({
                success: true,
                message: 'List Detail User',
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

const popularBasedonMonth = (req, res) => {
    let { month, year } = req.query; 
    month = parseInt(month) || null;
    year = parseInt(year) || null;
    const data = {month, year};
    if (!month && !year){
        return res.status(400).send({
            success: false,
            message: 'Month and Year must be filled with number'
        });
    }
    if (!month){
        return res.status(400).send({
            success: false,
            message: 'Month must be filled with number'
        });
    }
    if (!year){
        return res.status(400).send({
            success: false,
            message: 'Year must be filled with number'
        });
    }
    historyModel.popularBasedonMonth(data, (result) => {
        const cekMonth = (month) => {
            return new Promise((resolve, reject) =>{
                setTimeout(()=>{
                    const mon = [1,2,3,4,5,6,7,8,9,10,11,12];
                    let cek = mon.find((item)=>{
                        return item === month;
                    });
                    if(cek){
                        resolve(cek);    
                    } else {
                        reject(new Error('Month ' + month + ' does not include month'));
                    }
                }, 2000);
            });
        };
        cekMonth(month, year).then((cek)=>{
            if (result.length > 0){
                return res.send({
                    success: true,
                    message: 'Most Popular Vehicles in month ' + cek + ' ' + year,
                    result
                });
            } else {
                return res.status(404).send({
                    success: false,
                    message: 'Data vehicles not found'
                });
            }
        }).catch((err)=>{
            return res.status(400).send({
                success: false,
                message: ''+ err + '' 
            });
        });
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
            message: 'ID user and vehicles must be filled with number!'
        });
    }
    if (!data2.id_users){
        return res.status(400).send({
            success: false,
            message: 'ID user must be filled with number!'
        });
    }
    if (!data2.id_vehicles){
        return res.status(400).send({
            success: false,
            message: 'ID vehicles must be filled with number!'
        });
    }
    historyModel.postHistory(data2, (result) =>{
        if (result.affectedRows == 1){
            historyModel.getPostHistory( (result) => {
                const mapResults = result.map(o => {
                    if(o.image!== null){
                        o.image = `${APP_URL}/${o.image}`;
                    }
                    return o;
                });
                return res.send({
                    success: true,
                    message: 'History Posted',
                    result: mapResults[0]
                });
            });
        } else {
            return res.status(500).send({
                success: false,
                message: 'History failed to Post'
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
    historyModel.getDelHistory(dataID, (result) => {
        historyModel.delHistory(dataID, () => {
            if (result.affectedRows !== 1){
                historyModel.delHistory(dataID, () => {
                    if(result.length > 0){
                        return res.send({
                            success: false,
                            message : 'History Success Deleted',
                            result
                        });
                    } else {
                        return res.status(404).send({
                            success: true,
                            message : 'Data History not Found',
                        });
                    }
                });
            } else {
                return res.status(500).send({
                    success: false,
                    message: 'Data History failed to Delete'
                });
            }
        });
    });
    
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
        id_users: parseInt(req.body.id_users),
        id_vehicles: parseInt(req.body.id_vehicles),
        returned: req.body.returned,
        new_arrival: req.body.new_arrival,
    };
    if (!data.id_users && !data.id_vehicles){
        return res.status(400).send({
            success: false,
            message: 'ID user and vehicles must be filled with number!'
        });
    }
    if (!data.id_users){
        return res.status(400).send({
            success: false,
            message: 'ID user must be filled with number!'
        });
    }
    if (!data.id_vehicles){
        return res.status(400).send({
            success: false,
            message: 'ID vehicles must be filled with number!'
        });
    }
    historyModel.patchHistory(data, dataID, (result) =>{
        if (result.affectedRows == 1){
            historyModel.getPatchHistory(dataID, (result) => {
                return res.send({
                    success: true,
                    message: 'Data History Updated',
                    result
                });
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'Data History not Found with that ID',
            });
        }
    });
};

module.exports = {dataHistory, detailHistory, popularVehicles, popularBasedonMonth, postHistory, delHistory, patchHistory};