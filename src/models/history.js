const db = require ('../helpers/database');

exports.dataHistory = (data, cb) => {
    db.query(`SELECT u.name as userFullName, v.merk as vehicleName, start_rent, v.price*50/100 AS minPrepayment, h.returned FROM history h LEFT JOIN users u ON h.id_users = u.id LEFT JOIN vehicles v ON h.id_vehicles = v.id WHERE merk LIKE '%${data.search}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.countHistory = (data, cb) => {
    db.query(`SELECT COUNT(*) as total FROM history h LEFT JOIN vehicles v ON h.id_vehicles = v.id WHERE v.merk LIKE '%${data.search}%'` , (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.popularVehicles = (cb) => {
    db.query('SELECT COUNT(*) AS mostPopular, v.merk AS vehicleName, h.id_vehicles AS IDV, v.category_id AS Category, v.price*50/100 AS minPrepayment, v.location AS Location, v.createdAt AS NewData FROM history h LEFT JOIN vehicles v ON v.id = h.id_vehicles GROUP BY h.id_vehicles ORDER BY COUNT(*) DESC', (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.popularBasedonDate = (data, cb) => {
    db.query(`SELECT COUNT(*) AS mostPopular, v.merk AS vehicleName, h.id_vehicles AS IDV, v.category_id AS Category FROM history h LEFT JOIN vehicles v ON v.id = h.id_vehicles WHERE h.createdAt >= NOW() - INTERVAL '${data.month}' MONTH GROUP BY h.id_vehicles ORDER BY COUNT(*) DESC`, (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.postHistory = (data2, cb) => {
    db.query('INSERT INTO history (id_users, id_vehicles, returned, new_arrival) VALUES (? , ? , ? , ?)',[data2.id_users, data2.id_vehicles, data2.returned, data2.new_arrival], (error, res) => {
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
    db.query('UPDATE history SET returned = ?, new_arrival = ? WHERE id = ?', [data.returned, data.new_arrival, id], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};


