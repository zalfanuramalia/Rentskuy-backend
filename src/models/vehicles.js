const db = require ('../helpers/database');

exports.vehiclesOnLocation = (data, location, cb) => {
  db.query(`SELECT v.*, c.name as type FROM vehicles v LEFT JOIN category c ON v.category_id=c.id WHERE v.location = ? && brand LIKE '%${data.search}%'  ORDER BY v.${data.tool} ${data.sort} LIMIT ${data.limit} OFFSET ${data.offset}`,
    [location], (err, res) => {
      if (err) throw err;
      cb(res);
    });
};

exports.vehiclesCategory = (data, category, cb) => {
  const apa = db.query(`SELECT v.*, c.name as type  FROM vehicles v LEFT JOIN category c ON v.category_id=c.id WHERE category_id = ? AND brand LIKE '%${data.search}%' LIMIT ${data.limit} OFFSET ${data.offset} `,
    [category], (err, res) => {
      if (err) throw err;
      cb(res);
    });
  console.log(apa.sql);
};

exports.countVehicles = (data, cb) => {
  db.query(`SELECT COUNT(*) as total FROM vehicles WHERE brand LIKE '%${data.search}%'` , (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.getVehicles = (data, cb) => {
  db.query(`SELECT v.*, c.name AS type FROM vehicles v LEFT JOIN category c ON v.category_id=c.id WHERE brand LIKE '%${data.search}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.getVehiclesSearch = (data) => new Promise ((resolve, reject) => {
  var filled = ['location', 'type', 'payment'];
  var resultFillter = '';
  filled.forEach((item) => {
    if (data.filter[item]) {
      resultFillter += ` and ${item}='${data.filter[item]}'`;
    }
  });
  const query = db.query(`SELECT v.*, image, c.name AS type FROM vehicles v LEFT JOIN category c ON v.category_id=c.id WHERE v.brand LIKE '%${data.search}%' ${resultFillter} ${data.date!=='' ? `and h.start_rent = '${data.date}' or h.end_rent='${data.date}'` : ''} order by ${data.sort} ${data.order} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
  console.log(query.sql);
});

exports.countVehiclesSearch = (data) => new Promise ((resolve, reject) => {
  var filled = ['location', 'type', 'payment_id', 'date'];
  var resultFillter = '';
  filled.forEach((item) => {
    if (data.filter[item]) {
      resultFillter += ` and ${item}='${data.filter[item]}'`;
    }
  });
  db.query(`SELECT COUNT(*) as total FROM vehicles v left join category c on c.id = v.category_id WHERE brand LIKE '%${data.search}%' ${resultFillter}` , (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});
  

exports.getVehicle = (id, cb) => {
  db.query('SELECT * FROM vehicles WHERE id = ?',[id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.patchVehicle = ( data, dataID, cb) => {
  db.query('UPDATE `vehicles` SET ? WHERE id = ?', 
    [data, dataID], (error, res) => {
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


exports.delVehicle = (id) => new Promise ((resolve, reject) => {
  db.query('DELETE FROM vehicles WHERE id = ?',[id], (error, res) => {
    if (error) reject (error);
    resolve(res);
  });
});

exports.getDelVehicle = (dataID) => new Promise ((resolve, reject) => {
  db.query('SELECT * FROM vehicles WHERE id = ?',[dataID], (err, res) => {
    if (err) reject (err);
    resolve(res);
  });
});

exports.postVehicle = (data1) => new Promise ((resolve, reject) => {
  db.query(`INSERT INTO vehicles (category_id, brand, image, price, location, qty, description) VALUES ('${data1.category_id}','${data1.brand}', '${data1.image}','${data1.price}','${data1.location}','${data1.qty}','${data1.description}')`,
    (error, res) => {
      if (error) reject (error);
      resolve(res);
    });
});

exports.getPostVehicle = (id) => new Promise ((resolve, reject) => {
  db.query('SELECT * FROM vehicles WHERE id = ? ORDER BY id DESC LIMIT 1',[id], (error, res) => {
    if (error) reject (error);
    resolve(res);
  });
});

// exports.getBrand = (data1) => new Promise ((resolve, reject) => {
//   db.query('SELECT brand FROM vehicles WHERE brand = ?',[data1.brand], (err, res) => {
//     if (err) reject (err);
//     resolve(res);
//   });
// });









