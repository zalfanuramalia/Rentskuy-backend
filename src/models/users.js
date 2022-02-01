const db = require ('../helpers/database');

exports.dataUsers = (cb) => {
    db.query('SELECT * FROM users', (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.dataUser = (id, cb) => {
    db.query('SELECT * FROM users WHERE id = ?',[id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.postUser = (data2, cb) => {
    db.query('INSERT INTO users (id, name, identity, gender, email, address, number, birthdate) VALUES (? , ? , ? , ? , ? , ? , ? , ?)',[data2.id, data2.name, data2.identity, data2.gender, data2.email, data2.address, data2.number, data2.birthdate], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};

exports.delUser = (id, cb) => {
    db.query('DELETE FROM users WHERE id = ?',[id], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};

exports.patchUser = (data2, id, cb) => {
    db.query('UPDATE users SET name = ? , identity = ? , gender = ? , email =  ? , address = ? , number = ? , birthdate = ? WHERE id = ?', [data2.name, data2.identity, data2.gender, data2.email, data2.address, data2.number, data2.birthdate], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};