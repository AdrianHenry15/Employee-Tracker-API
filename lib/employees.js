const db = require("../db/connection.js");

function getAllEmployees() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT e.id, e.first_name, e.last_name,
        roles.title,
        departments.name AS department,
        roles.salary,
        m.first_name AS manager FROM employees e
        LEFT JOIN employees m ON m.id = e.manager_id
        LEFT JOIN roles ON e.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        ORDER BY e.role_id`;

        db.query(sql, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

function addNewEmployee(data) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`;

        db.query(
            sql, [data.first_name, data.last_name, data.role_id, data.manager_id],
            (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(`Added ${data.first_name} ${data.last_name} to the database.`);
            }
        );
    });
}

function deleteEmployee(data) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM employees WHERE id = ?`;

        db.query(sql, [data.value], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(`${data.name} was removed from the database.`);
        });
    });
}

function updateEmployeesRole(data) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;

        db.query(sql, [data.role.value, data.employee.value], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(`${data.employee.name}'s role was updated.`);
        });
    });
}

function updateEmployeeManager(data) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;

        db.query(sql, [data.manager_id, data.id], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(`Employee's manager was updated.`);
        });
    });
}

function getEmployeesByDepartment(data) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT e.id, e.first_name, e.last_name,
        roles.title AS title,
        departments.name AS department,
        roles.salary,
        m.first_name AS manager FROM employees e
        LEFT JOIN employees m ON m.id = e.manager_id
        LEFT JOIN roles ON e.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        WHERE departments.name = ?`;
        db.query(sql, [data.name], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

function getEmployeesByManager(data) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT e.id, e.first_name, e.last_name,
    roles.title AS title,
    departments.name AS department,
    roles.salary,
    m.first_name AS manager FROM employees e
    LEFT JOIN employees m ON m.id = e.manager_id
    LEFT JOIN roles ON e.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    WHERE e.manager_id = ?`;

        db.query(sql, [data.id], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

function getAllManagers() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT DISTINCT m.id, m.first_name, m.last_name, roles.title
    FROM employees e
    LEFT JOIN employees m ON m.id = e.manager_id
    LEFT JOIN roles ON m.role_id = roles.id
    WHERE e.manager_id IS NOT NULL`;

        db.query(sql, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

// Export all the functions
module.exports = {
    getAllEmployees,
    addNewEmployee,
    deleteEmployee,
    updateEmployeesRole,
    getEmployeesByDepartment,
    getEmployeesByManager,
    getAllManagers,
    updateEmployeeManager,
};