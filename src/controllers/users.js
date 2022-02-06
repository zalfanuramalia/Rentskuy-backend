const userModel = require('../models/users');

const dataUsers = (req, res) => {
    let {search, page, limit } = req.query;
    search = search || '';
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page - 1) * limit;
    const data = { search, page, limit, offset };
    userModel.dataUsers(data, (result) => {
        userModel.countUsers(data,(count) => {
            const { total } = count[0];
            const last = Math.ceil(total/limit);
            if (result.length > 0){
                return res.send({
                    success: true,
                    message: 'Data Users',
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
                    message: 'Data Users not Found'
                });
            }
        });
    });
};

const dataUser = (req, res) => {
    const dataID =parseInt(req.params.id);
    if (!dataID){
        return res.status(400).send({
            success: false,
            message: 'ID must be number!'
        });
    }
    userModel.dataUser(dataID, (result) => {
        if (result.length > 0){
            return res.send({
                success: true,
                message: 'List Detail User',
                results: result[0]
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            });
        }
    });
};

const postUser = (req, res) => {
    const data2 = {
        id: res.length + 1,
        name: req.body.name,
        identity: parseInt(req.body.identity),
        gender: req.body.gender,
        email: req.body.email,
        address: req.body.address,
        number: req.body.number,
        birthdate: req.body.birthdate,
    };
    if(!data2.identity){
        return res.status(400).send({
            success: false,
            message: 'Identity must be number!'
        });
    }
    userModel.postUser(data2, (result) =>{
        if (result.affectedRows == 1){
            return res.send({
                success: true,
                message: 'Data User Posted',
                result: req.body
            });
        } else {
            return res.status(500).send({
                success: false,
                message: 'Data not Posted'
            });
        }
    }); 
};

const delUser = (req, res) => {
    const dataID = parseInt(req.params.id);
    if(!dataID){
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
                        message : 'User failed to Delete',
                        result
                    });
                } else {
                    return res.send({
                        success: true,
                        message : 'User was Delete',
                        result
                    });
                }
            };
            userModel.delUser( dataID, ress);
        } else {
            return res.status(404).send({
                success: false,
                message: 'There is no User with that ID ',
                result
            });
        }
    };
    userModel.delUser(dataID, process);
};

const patchUser = (req, res)=>{
    const dataID = parseInt(req.params.id);
    if(!dataID){
        return res.status(400).send({
            success: false,
            message: 'ID must be number!'
        });
    }
    const data = {
        name: req.body.name,
        identity: parseInt(req.body.identity),
        gender: req.body.gender,
        email: req.body.email,
        address: req.body.address,
        number: req.body.number,
        birthdate: req.body.birthdate,
    };
    const em = data.email.indexOf('@');
    if (em < 1){
        return res.status(400).send({
            success: false,
            message: 'Enter email correctly'
        });
    }
    if(!data.identity){
        return res.status(400).send({
            success: false,
            message: 'Identity must be number!'
        });
    }
    const ress = (result) =>{
        if (result.affectedRows == 1){
            return res.send({
                success: true,
                message: 'Data User Updated',
                result: req.body
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'Data Users not Found with that ID'
            });
        }
        
    };
    userModel.patchUser(data, dataID, ress);  
};


module.exports = {dataUsers, dataUser, postUser, delUser, patchUser};