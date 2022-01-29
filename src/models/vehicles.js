const db = require ('../helpers/database');

exports.getVehicles = (cb) => {
    db.query('SELECT * FROM vehicles', (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getVehicle = (id, cb) => {
    db.query('SELECT * FROM vehicles WHERE id = ?',[id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.patchVehicle = (data, id, cb) => {
    db.query('UPDATE vehicles SET merk = ?, price = ?, location = ?, capacity = ?, can_prepayment = ?, isAvailable = ?, reservation = ? WHERE id = ?', [data.merk, data.price, data.location, data.capacity, data.can_prepayment, data.isAvailable, data.reservation, id], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};

exports.delVehicle = (id, cb) => {
    db.query('DELETE FROM vehicles WHERE id = ?',[id], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};

exports.postVehicle = (data1, cb) => {
    db.query('INSERT INTO vehicles (merk, price, location, can_prepayment, isAvailable, reservation) VALUES (? , ? , ? , ? , ? , ? , ?)',[data1.merk, data1.price, data1.clocation, data1.capacity, data1.can_prepayment, data1.isAvailable, data1.reservation], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};

