const userModel = require('../models/users');

const dataUser = (req, res) => {
    userModel.dataUser((result) => {
        if (result.length> 0){
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

const postUser = (req, res) => {
    const data2 = {
        id: req.body.id,
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
        if (result.length > 0){
            const ress = (result) =>{
                if(result.affectedRows == 1){
                    return res.send({
                        success: true,
                        message : 'Data User was Delete'
                    });
                } else {
                    return res.status(500).send({
                        success: false,
                        message : 'Data User failed to Delete'
                    });
                }
            };
            userModel.delUser(id, ress);
        } else {
            return res.status(404).send({
                success: false,
                message: 'Data User not Found'
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
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'Data not Found'
            });
        }
        
    };
    userModel.patchVehicle(data, id, ress);  
};


module.exports = {dataUser, postUser, delUser, patchUser};