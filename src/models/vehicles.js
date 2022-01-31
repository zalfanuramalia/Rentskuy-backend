const db = require ('../helpers/database');

exports.countVehicles = (data, cb) => {
    db.query(`SELECT COUNT(*) as total FROM vehicles WHERE merk LIKE '%${data.search}%'` , (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getVehicles = (data, cb) => {
    db.query(`SELECT id, merk, price, location, capacity, can_prepayment, isAvailable, popularity FROM vehicles WHERE merk LIKE '%${data.search}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
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
    db.query('UPDATE vehicles SET merk = ?, price = ?, location = ?, capacity = ?, can_prepayment = ?, isAvailable = ?, popularity = ? WHERE id = ?', [data.merk, data.price, data.location, data.capacity, data.can_prepayment, data.isAvailable, data.popularity, id], (error, res) => {
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
    db.query('INSERT INTO vehicles (merk, price, location, capacity, can_prepayment, isAvailable, popularity) VALUES (? , ? , ? , ? , ? , ? , ?)',[data1.merk, data1.price, data1.location, data1.capacity, data1.can_prepayment, data1.isAvailable, data1.popularity], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};



