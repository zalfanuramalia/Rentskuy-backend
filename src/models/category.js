const db = require ('../helpers/database');

exports.categories = (cb) => {
    db.query('SELECT * FROM category', (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.postCategories = (data, cb) => {
    db.query('INSERT INTO category (name) VALUES (?)',[data.name], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.delCategories = (id, cb) => {
    db.query('DELETE FROM category WHERE id = ?',[id], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};