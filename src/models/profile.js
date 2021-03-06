const db = require('../helpers/database');

exports.getProfiles = (cb)=>{
  db.query('SELECT name, image, username, email, gender, birthdate, role FROM users', (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.getProfile = (id, cb)=>{
  db.query('SELECT id, name, identity, gender, email, address, number, birthdate, role, image FROM users WHERE id=?', [id], (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};