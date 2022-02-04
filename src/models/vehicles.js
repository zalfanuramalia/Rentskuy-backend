const db = require ('../helpers/database');

exports.vehiclesCategory = (category, cb) => {
    db.query('SELECT v.merk, c.name as categoryName FROM vehicles v LEFT JOIN category c ON v.category_id=c.id WHERE category_id = ?',
        [category], (err, res) => {
            if (err) throw err;
            cb(res);
        });
};

exports.getVehicles = (data, cb) => {
    db.query(`SELECT * FROM vehicles WHERE merk LIKE '%${data.search}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.countVehicles = (data, cb) => {
    db.query(`SELECT COUNT(*) as total FROM vehicles WHERE merk LIKE '%${data.search}%'` , (err, res) => {
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

exports.patchVehicle = (price, qty, data, id, cb) => {
    const cek = db.query('UPDATE vehicles SET category_id = ? , merk = ?, price = ?, location = ?, qty = ?, can_prepayment = ?, isAvailable = ? WHERE id = ?', 
        [data.category_id, data.merk, price, data.location, qty, data.can_prepayment, data.isAvailable, id], (error, res) => {
            if (error) throw error;
            cb(res);
        });
    console.log(cek.sql);
};

exports.delVehicle = (id, cb) => {
    db.query('DELETE FROM vehicles WHERE id = ?',[id], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};

exports.postVehicle = (price, qty, data1, cb) => {
    db.query('INSERT INTO vehicles (category_id, merk, price, location, qty, can_prepayment, isAvailable) VALUES (? , ? , ? , ? , ? , ? , ?)',
        [data1.category_id, data1.merk, price, data1.location, qty, data1.can_prepayment, data1.isAvailable], (error, res) => {
            if (error) throw error;
            cb(res);
        });
};







