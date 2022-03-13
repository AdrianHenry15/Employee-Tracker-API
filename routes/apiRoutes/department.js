const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all departments
router.get('/department', (req, res) => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Get total budget
router.get('/department/:id', (req, res) => {
    const sql = `SELECT department.id, 
    department.name AS department, 
    SUM(roles.salary) AS "total budget" FROM roles
    LEFT JOIN department ON department.id = roles.department_id
    LEFT JOIN employee ON roles.id = employee.roles_id
    WHERE department.id = ?`;

    db.squery(sql, (err, rows) => {
        if (err) {
            res.status(501).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Delete a department
router.delete('/department/:id', (req, res) => {
    const sql = `DELETE FROM department WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Department not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// Add new department
router.post('/department/', ({ body }, res) => {
    const errors = inputCheck(
        body,
        'name'
    );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = body.name

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            messsage: 'success',
            data: body
        });
    });
});

module.exports = router;