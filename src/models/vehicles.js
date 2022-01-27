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
    db.query('UPDATE vehicles SET merk = ?, price = ? WHERE id = ?', [data.merk, data.price, id], (error, res) => {
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
    db.query('INSERT INTO vehicles (merk, price, color, year, isAvailable) VALUES (? , ? , ? , ? , ?)',[data1.merk, data1.price, data1.color, data1.year, data1.isAvailable], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};
