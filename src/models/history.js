const db = require ('../helpers/database');

exports.popularVehicles = (cb) => {
    db.query('SELECT COUNT(*) AS mostPopular, v.merk AS vehicleName FROM history h LEFT JOIN vehicles v ON v.id = h.id_vehicles GROUP BY h.id_vehicles ORDER BY COUNT(*) DESC;', (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.dataHistory = (cb) => {
    db.query('SELECT u.name as userFullName, v.merk as vehicleName, prepayment, date_rent FROM history h LEFT JOIN users u ON h.id_users = u.id LEFT JOIN vehicles v ON h.id_vehicles = v.id', (err, res) => {
        if (err) throw err;
        cb(res);
    });
};


exports.postHistory = (data2, cb) => {
    db.query('INSERT INTO history (id_users, id_vehicles, `return`, prepayment, new_arrival) VALUES (? , ? , ? , ? , ?)',[data2.id_users, data2.id_vehicles, data2.return, data2.prepayment, data2.new_arrival], (error, res) => {
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
    db.query('UPDATE history SET  return = ?, prepayment = ?, new_arrival = ? WHERE id = ?', [data.return, data.prepayment, data.new_arrival, id], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};


