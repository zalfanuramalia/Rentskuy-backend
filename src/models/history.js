const db = require ('../helpers/database');

exports.postHistory = (data2, cb) => {
    db.query('INSERT INTO history (date_rent, return, prepayment, new_arrival) VALUES (? , ? , ? , ?)',[data2.date_rent, data2.return, data2.prepayment, data2.new_arrival], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};

exports.delHistory = (id, cb) => {
    db.query('DELETE FROM history WHERE id = ?',[id], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};

exports.patchHistory = (data, id, cb) => {
    db.query('UPDATE history SET date_rent = ?, return = ?, prepayment = ?, new_arrival = ? WHERE id = ?', [data.date_rent, data.return, data.prepayment, data.new_arrival, id], (error, res) => {
        if (error) throw error;
        cb(res);
    });
};

exports.dataHistory = (cb) => {
    db.query('SELECT * FROM history', (err, res) => {
        if (err) throw err;
        cb(res);
    });
};