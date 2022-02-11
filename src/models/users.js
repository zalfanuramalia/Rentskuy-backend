const db = require ('../helpers/database');

exports.dataUsers = (data, cb) => {
  db.query(`SELECT * FROM users WHERE name LIKE '%${data.search}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.countUsers = (data, cb) => {
  db.query(`SELECT COUNT(*) as total FROM users WHERE name LIKE '%${data.search}%'` , (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.dataUser = (id) => new Promise ((resolve, reject) => {
  db.query('SELECT * FROM users WHERE id = ?',[id], (err, res) => {
    if (err) reject (err);
    resolve(res);
  });
});

exports.postUser = (data2) => new Promise ((resolve, reject) => {
  db.query(`INSERT INTO users (name, identity, gender, email, address, number, birthdate, username, password) VALUES 
  ('${data2.name}', '${data2.identity}', '${data2.gender}', '${data2.email}', '${data2.address}', '${data2.number}', '${data2.birthdate}', '${data2.username}', '${data2.password}')`,
  (err, res) => {
    if (err) reject (err);
    resolve(res);
  });
});

exports.getPostUser = () => new Promise ((resolve, reject) => {
  db.query('SELECT * FROM users ORDER BY id DESC LIMIT 1', (err, res) => {
    if (err) reject (err);
    resolve(res);
  });
});

exports.delUser = (id, cb) => {
  db.query('DELETE FROM users WHERE id = ?',[id], (error, res) => {
    if (error) throw error;
    cb(res);
  });
};

exports.patchUser = (data, id, cb) => {
  db.query('UPDATE users SET name = ? , identity = ? , gender = ? , email =  ? , address = ? , number = ? , birthdate = ? WHERE id = ?', 
    [data.name, data.identity, data.gender, data.email, data.address, data.number, data.birthdate, id], (error, res) => {
      if (error) throw error;
      cb(res);
    });
};

exports.userByUsername = (username) => new Promise ((resolve, reject) => {
  db.query('SELECT id, username, password FROM users WHERE username = ?', [username], (err, res) => {
    if (err) reject (err);
    resolve(res);
  });
});

exports.registerUser = (data2) => new Promise ((resolve, reject) => {
  db.query(`INSERT INTO users (name, email,  username, password) VALUES 
  ('${data2.name}', '${data2.email}', '${data2.username}', '${data2.password}')`,
  (err, res) => {
    if (err) reject (err);
    resolve(res);
  });
});

exports.registerByUsername = (username) => new Promise ((resolve, reject) => {
  db.query('SELECT id, email, username, password FROM users WHERE username = ? OR email = ?', [username, username], (err, res) => {
    if (err) reject (err);
    resolve(res);
  });
});

exports.updateUser = (data, id) => new Promise((resolve, reject) => {
  db.query('UPDATE `users` SET ? WHERE id=?', [data, id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});