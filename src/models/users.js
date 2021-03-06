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
  db.query(`INSERT INTO users (name, identity, gender, email, address, number, birthdate, username, password, image, role) VALUES 
  ('${data2.name}', '${data2.identity}', '${data2.gender}', '${data2.email}', '${data2.address}', '${data2.number}', '${data2.birthdate}', '${data2.username}', '${data2.password}', '${data2.image}', '${data2.role}')`,
  (err, res) => {
    if (err) reject (err);
    resolve(res);
  });
});

exports.getPostUser = (email) => new Promise ((resolve, reject) => {
  db.query('SELECT * FROM users WHERE email = ?',[email], (err, res) => {
    if (err) reject (err);
    resolve(res);
  });
});

exports.delUser = (id) => new Promise ((resolve, reject) => {
  db.query('DELETE FROM users WHERE id = ?',[id], (error, res) => {
    if (error) reject (error);
    resolve(res);
  });
});

exports.patchUser = (data, id) => new Promise ((resolve, reject) =>{
  db.query('UPDATE `users` SET ? WHERE id=?', [data, id], (error, res) => {
    if (error) reject (error);
    resolve(res);
  });
});
  

exports.userByUsername = (email) => new Promise ((resolve, reject) => {
  db.query('SELECT id, email, role, password FROM users WHERE email = ?', [email], (err, res) => {
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
  db.query('SELECT id, email, username FROM users WHERE username = ? OR email = ?', [username, username], (err, res) => {
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

exports.getUser = (data) => new Promise ((resolve, reject) => {
  db.query('SELECT name FROM users WHERE email = ?',[data.email], (err, res) => {
    if (err) reject (err);
    resolve(res);
  });
});

exports.getUname = (data) => new Promise ((resolve, reject) => {
  db.query('SELECT name FROM users WHERE email = ?',[data.email], (err, res) => {
    if (err) reject (err);
    resolve(res);
  });
});

