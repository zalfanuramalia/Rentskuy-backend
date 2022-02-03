const userModel = require('../models/users');

const dataUsers = (req, res) => {
    userModel.dataUsers((result) => {
        if (result.length > 0){
            return res.send({
                success: true,
                message: 'Data Users',
                result
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'Data not Found'
            });
        }
    });
};

const dataUser = (req, res) => {
    const dataID =req.params.id;
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
        identity: req.body.identity,
        gender: req.body.gender,
        email: req.body.email,
        address: req.body.address,
        number: req.body.number,
        birthdate: req.body.birthdate,
    };
    userModel.postUser(data2, (result) =>{
        if (result.affectedRows == 1){
            return res.send({
                success: true,
                message: 'Data User Posted',
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

const delUser = (req, res) => {
    const {id} = req.params;
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
            userModel.delUser( id, ress);
        } else {
            return res.status(404).send({
                success: false,
                message: 'There is no User with that ID ',
                result
            });
        }
    };
    userModel.delUser(id, process);
};

const patchUser = (req, res)=>{
    const {id} =req.params;
    const data = {
        name: req.body.name,
        identity: req.body.identity,
        gender: req.body.gender,
        email: req.body.email,
        address: req.body.address,
        number: req.body.number,
        birthdate: req.body.birthdate,
    };
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
                message: 'Data not Found'
            });
        }
        
    };
    userModel.patchUser(data, id, ress);  
};


module.exports = {dataUsers, dataUser, postUser, delUser, patchUser};