const db = require ('../helpers/database');

exports.categories = (cb) => {
  db.query('SELECT * FROM category', (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.detailCategories = (cb) => {
  db.query('SELECT * FROM category ORDER BY id DESC LIMIT 1', (error, res) => {
    if (error) throw error;
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

exports.patchCategory = (data, id, cb) => {
  db.query('UPDATE category SET name = ? WHERE id = ?', [data.name, id], (error, res) => {
    if (error) throw error;
    cb(res);
  });
};