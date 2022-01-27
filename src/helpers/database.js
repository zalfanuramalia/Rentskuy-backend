const mysql = require('mysql');

const con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'vehicles_rent'
});

con.connect();

module.exports = con;