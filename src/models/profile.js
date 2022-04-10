const db = require('../helpers/database');
const {APP_URL} = process.env;

exports.getProfiles = (cb)=>{
  db.query('SELECT name, image, username, email, gender, birthdate, role FROM users', (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.getProfile = (id, cb)=>{
  db.query(`SELECT id, name, identity, gender, email, address, number, birthdate, role, CONCAT('${APP_URL}/', image) as image FROM users WHERE id=?`, [id], (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};