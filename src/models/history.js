const db = require ('../helpers/database');

exports.dataHistory = (data, cb) => {
  db.query(`SELECT u.name as userFullName, v.brand as vehicleName, v.image AS image, start_rent, v.qty AS Quantity, v.price AS Price, v.price*50/100 AS minPrepayment, v.location AS Location, h.returned FROM history h LEFT JOIN users u ON h.id_users = u.id LEFT JOIN vehicles v ON h.id_vehicles = v.id WHERE v.brand LIKE '%${data.search}%' ORDER BY v.${data.tool} ${data.sort} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.countHistory = (data, cb) => {
  db.query(`SELECT COUNT(*) as total FROM history h LEFT JOIN vehicles v ON h.id_vehicles = v.id WHERE v.brand LIKE '%${data.search}%'` , (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.detailHistory = (dataID, cb) => {
  db.query('SELECT u.name as userFullName, h.id_users AS usersId, v.brand as vehicleName, h.id_vehicles AS vehiclesId, start_rent, h.returned FROM history h LEFT JOIN users u ON h.id_users = u.id LEFT JOIN vehicles v ON h.id_vehicles = v.id WHERE h.id = ?',[dataID], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.popularVehicles = (cb) => {
  db.query('SELECT COUNT(*) AS mostPopular, v.brand AS vehicleName, h.id_vehicles AS IDV, v.category_id AS Category, v.price*50/100 AS minPrepayment, v.location AS Location, v.createdAt AS NewData FROM history h LEFT JOIN vehicles v ON v.id = h.id_vehicles GROUP BY h.id_vehicles ORDER BY COUNT(*) DESC', (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.popularBasedonMonth = (data, cb) => {
  db.query(`SELECT COUNT(*) AS mostPopular, v.brand AS vehicleName, h.id_vehicles AS IDV, v.category_id AS Category, MONTH(h.createdAt) AS Month FROM history h LEFT JOIN vehicles v ON v.id = h.id_vehicles WHERE MONTH(h.createdAt) = '${data.month}' AND YEAR(h.createdAt) = '${data.year}' GROUP BY h.id_vehicles ORDER BY COUNT(*) DESC`, (err, res) => {
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

exports.getPostHistory = (cb) => {
  db.query('SELECT u.name as userFullName, h.id_users AS usersId, v.brand as vehicleName, h.id_vehicles AS vehiclesId, v.image AS image, start_rent, h.returned FROM history h LEFT JOIN users u ON h.id_users = u.id LEFT JOIN vehicles v ON h.id_vehicles = v.id ORDER BY h.id DESC LIMIT 1', (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.delHistory = (id, cb) => {
  db.query('DELETE FROM history WHERE id = ?',[id], (error, res) => {
    if (error) throw error;
    cb(res);
  });
};

exports.getDelHistory = (dataID, cb) => {
  db.query('SELECT h.id_users AS usersId, u.name as userFullName, h.id_vehicles AS vehiclesId, v.brand as vehicleName, start_rent, h.returned FROM history h LEFT JOIN users u ON h.id_users = u.id LEFT JOIN vehicles v ON h.id_vehicles = v.id WHERE h.id = ?',[dataID], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.patchHistory = (data, dataID, cb) => {
  db.query('UPDATE history SET id_users = ?, id_vehicles = ?, returned = ?, new_arrival = ? WHERE id = ?', [data.id_users, data.id_vehicles, data.returned, data.new_arrival, dataID], (error, res) => {
    if (error) throw error;
    cb(res);
  });
};

exports.getPatchHistory = (dataID, cb) => {
  db.query('SELECT u.name as userFullName, h.id_users AS usersId, v.brand as vehicleName, h.id_vehicles AS vehiclesId, v.image AS image, start_rent, h.returned FROM history h LEFT JOIN users u ON h.id_users = u.id LEFT JOIN vehicles v ON h.id_vehicles = v.id WHERE h.id = ?',[dataID], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};
