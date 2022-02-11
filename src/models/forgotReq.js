const db = require('../helpers/database');

exports.createRequest = (id_user, code) => new Promise((resolve, reject) => {
  db.query('INSERT INTO forgot_request (id_user, code) VALUES (?,?)', [id_user, code], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.updateRequest = (data, id) => new Promise((resolve, reject) => {
  db.query('UPDATE `forgot_request` SET ? WHERE id=?', [data, id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getRequest = (code) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM forgot_request WHERE code=?', [code], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getUser = (id) => new Promise ((resolve, reject) => {
  db.query('SELECT id, username, email, password FROM users WHERE id = ?',[id], (err, res) => {
    if (err) reject (err);
    resolve(res);
  });
});