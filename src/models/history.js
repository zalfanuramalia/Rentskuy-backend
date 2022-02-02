const db = require ('../helpers/database');

exports.postHistory = (data2, cb) => {
    db.query('INSERT INTO history (merk, return, prepayment, new_arrival, popularity) VALUES (? , ? , ? , ? , ?)',[data2.merk, data2.return, data2.prepayment, data2.new_arrival, data2.popularity], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};

exports.delHistory = (id, cb) => {
    db.query('DELETE FROM history WHERE id = ?',[id], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};

exports.patchHistory = (data, id, cb) => {
    db.query('UPDATE history SET merk = ?, return = ?, prepayment = ?, new_arrival = ?, popularity = ? WHERE id = ?', [data.merk, data.date_rent, data.return, data.prepayment, data.new_arrival, id], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};

exports.dataHistory = (cb) => {
    db.query('SELECT u.name as userFullName, v.merk as vehicleName, prepayment, date_rent FROM history h LEFT JOIN users u ON h.id_users = u.id LEFT JOIN vehicles v ON h.id_vehicles = v.id', (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

