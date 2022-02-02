const db = require ('../helpers/database');

exports.getVehicles = (data, cb) => {
    db.query(`SELECT * FROM vehicles WHERE merk LIKE '%${data.search}%' ORDER BY popularity DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
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

exports.patchVehicle = (data, id, cb) => {
    db.query('UPDATE vehicles SET category_id = ? , merk = ?, price = ?, location = ?, qty = ?, can_prepayment = ?, isAvailable = ?, popularity = ? WHERE id = ?', [data.category_id, data.merk, data.price, data.location, data.qty, data.can_prepayment, data.isAvailable, data.popularity, id], (error, res) => {
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
    db.query('INSERT INTO vehicles (merk, price, location, qty, can_prepayment, isAvailable, popularity) VALUES (? , ? , ? , ? , ? , ? , ?)',[data1.merk, data1.price, data1.location, data1.qty, data1.can_prepayment, data1.isAvailable, data1.popularity], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};

exports.vehiclesCategory = (category_id, cb) => {
    const qr = db.query('SELECT v.name, c.name as categoryName FROM vehicles v LEFT JOIN category c ON v.category_id=c.id WHERE category_id = ?)',
        [category_id], (err, res) => {
            if (err) throw err;
            cb(res);
        });
    console.log(qr.sql);
};





