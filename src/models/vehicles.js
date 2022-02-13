const db = require ('../helpers/database');

exports.vehiclesCategory = (category, cb) => {
  db.query('SELECT v.brand, c.name as categoryName FROM vehicles v LEFT JOIN category c ON v.category_id=c.id WHERE category_id = ?',
    [category], (err, res) => {
      if (err) throw err;
      cb(res);
    });
};

exports.getVehicles = (data, cb) => {
  db.query(`SELECT v.*, c.name AS categoryName FROM vehicles V LEFT JOIN category c ON v.category_id=c.id WHERE brand LIKE '%${data.search}%' ORDER BY ${data.tool} ${data.sort} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.countVehicles = (data, cb) => {
  db.query(`SELECT COUNT(*) as total FROM vehicles WHERE brand LIKE '%${data.search}%'` , (err, res) => {
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

exports.patchVehicle = ( data, dataID, cb) => {
  db.query('UPDATE vehicles SET category_id = ? , brand = ?, image = ?, price = ?, location = ?, qty = ?, can_prepayment = ?, isAvailable = ? WHERE id = ?', 
    [data.category_id, data.brand, data.image, data.price, data.location, data.qty, data.can_prepayment, data.isAvailable, dataID], (error, res) => {
      if (error) throw error;
      cb(res);
    });
};

exports.getPatchVehicle = (dataID, cb) => {
  db.query('SELECT * FROM vehicles WHERE id = ?',[dataID], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

// exports.updateVehicle = (data, id) => new Promise ((resolve, reject) => {
//   db.query('UPDATE `vehicles` SET ? WHERE id=?', [data, id], (err, res)=> {
//     if(err) reject (err);
//     resolve(res);
//   });
// });

exports.getVehicleAsync = (id) => new Promise((resolve, reject)=> {
  db.query('SELECT v.*, c.name AS categoryID FROM vehicles v LEFT JOIN category c ON v.category_id=c.id WHERE v.id=?', [id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.updateVehicleAsync = (data, id) => new Promise((resolve, reject)=> {
  db.query('UPDATE `vehicles` SET ? WHERE id=?', [data, id], (err, res)=> {
    if(err) reject(err);
    resolve(res); // Object => affectedRows
  });
});


exports.delVehicle = (id, cb) => {
  db.query('DELETE FROM vehicles WHERE id = ?',[id], (error, res) => {
    if (error) throw error;
    cb(res);
  });
};

exports.getDelVehicle = (dataID, cb) => {
  db.query('SELECT * FROM vehicles WHERE id = ?',[dataID], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.postVehicle = (data1, cb) => {
  db.query('INSERT INTO `vehicles` (category_id, brand, image, price, location, qty, can_prepayment, isAvailable) VALUES (?, ? , ? , ? , ? , ? , ? , ?)',
    [data1.category_id, data1.brand, data1.image, data1.price, data1.location, data1.qty, data1.can_prepayment, data1.isAvailable], (error, res) => {
      if (error) throw error;
      cb(res);
    });
};

exports.getPostVehicle = (cb) => {
  db.query('SELECT * FROM vehicles ORDER BY id DESC LIMIT 1', (err, res) => {
    if (err) throw err;
    cb(res);
  });
};











