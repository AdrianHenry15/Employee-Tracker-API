// Express
const express = require('express');
const app = express();
// Access Listen
const PORT = process.env.PORT || 3001;
// SQL
const mysql = require('mysql2');


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to db
const db = mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        //YOur MySQL password
        password: 'Breakup#1',
        database: 'election'
    },
    console.log('Connected to the eTrak database.')
);

// Routes

// Get single employee




// Default response for requests that are (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});