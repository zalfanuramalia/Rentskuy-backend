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

exports.dataUser = (id, cb) => {
    db.query('SELECT * FROM users WHERE id = ?',[id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.postUser = (data2, cb) => {
    db.query('INSERT INTO users (name, identity, gender, email, address, number, birthdate) VALUES (? , ? , ? , ? , ? , ? , ?)',[data2.name, data2.identity, data2.gender, data2.email, data2.address, data2.number, data2.birthdate], (error, res) => {
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

exports.patchUser = (data, id, cb) => {
    db.query('UPDATE users SET name = ? , identity = ? , gender = ? , email =  ? , address = ? , number = ? , birthdate = ? WHERE id = ?', 
        [data.name, data.identity, data.gender, data.email, data.address, data.number, data.birthdate, id], (error, res) => {
            if (error) throw error;
            cb(res);
        });
};