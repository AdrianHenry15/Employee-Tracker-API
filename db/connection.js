const mysql = require('mysql2');

// Connection to Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Breakup#1',
    database: 'etrak'
});

module.exports = db;