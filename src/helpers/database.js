const mysql = require('mysql');

const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

const con = mysql.createConnection({
    host : DB_HOST,
    user : DB_USER,
    password : DB_PASSWORD,
    database : DB_NAME
});

con.connect();

module.exports = con;