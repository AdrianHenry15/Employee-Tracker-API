const mysql = require('mysql2');
require("dotenv").config();

// Connection to Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASS,
    database: 'etrak'
});

module.exports = db;