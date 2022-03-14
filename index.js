const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require('./db/connection');



// Functions for Departments

function getAllDepartments() {
    return new Promise(function(resolve, reject) {
        const sql = "SELECT departments.id, departments.name AS department FROM departments";

        db.query(sql, function(err, rows) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

function addNewDepartment(data) {
    return new Promise(function(resolve, reject) {
        const sql = "INSERT INTO departments (name) VALUES (?)";

        db.query(sql, [data.name], function(err, rows) {
            if (err) {
                return reject(err);
            }
            resolve(`Added ${data.name} to the database.`);
        });
    });
};

function removeDepartment(data) {
    return new Promise(function(resolve, reject) {
        const sql = "DELETE FROM departments WHERE id = ?";

        db.query(sql, [data.value], function(err, rows) {
            if (err) {
                return reject(err);
            }
            resolve(`${data.name} was removed from the database.`);
        });
    });
};

function getTotalBudget(data) {
    return new Promise(function(resolve, reject) {
        const sql = `SELECT departments.id, departments.name AS department, SUM(roles.salary) AS "total budget"
      FROM roles
      LEFT JOIN departments ON departments.id = roles.department_id
      LEFT JOIN employees ON roles.id = employees.role_id
      WHERE departments.id = ?`;

        db.query(sql, [data.department_id], function(err, rows) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

// Functions for Employees

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

// Functions for Roles
function getAllRoles() {
    return new Promise(function(resolve, reject) {
        const sql = `SELECT roles.id, roles.title, departments.name AS departments,
        roles.salary FROM roles
        LEFT JOIN departments ON roles.department_id = departments.id`;

        db.query(sql, function(err, rows) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

function addNewRole(data) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO roles (title, salary, department_id)
        VALUES (?, ?, ?)`;

        db.query(
            sql, [data.title, data.salary, data.department_id],
            (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(`Added ${data.title} to the database.`);
            }
        );
    });
};

function removeARole(data) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM roles WHERE id = ?`;

        db.query(sql, [data.value], function(err, rows) {
            if (err) {
                return reject(err);
            }
            resolve(`${data.name} was removed from the database.`);
        });
    });
};

// Application Questions
class CMS {
    getMenu() {
        return inquirer
            .prompt([{
                type: "list",
                name: "menu",
                message: "What would you like to do?",
                choices: [
                    "View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "View All Employees by Department",
                    "View All Employees by Manager",
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "Update Employee Role",
                    "Update Employee Manager",
                    "Remove Employee",
                    "Remove Department",
                    "Remove Role",
                    "Total Budget by Department",
                    "Exit",
                ],
            }, ])
            .then((answer) => {
                switch (answer.menu) {
                    case "View All Departments":
                        this.viewAllDepartments();
                        break;
                    case "View All Roles":
                        this.viewAllRoles();
                        break;
                    case "View All Employees":
                        this.viewAllEmployees();
                        break;
                    case "View All Employees by Department":
                        this.viewAllEmployeesByDepartment();
                        break;
                    case "View All Employees by Manager":
                        this.viewAllEmployeesByManager();
                        break;
                    case "Add Employee":
                        this.addEmployee();
                        break;
                    case "Add Department":
                        this.addDepartment();
                        break;
                    case "Add Role":
                        this.addRole();
                        break;
                    case "Update Employee Role":
                        this.updateEmployeeRole();
                        break;
                    case "Update Employee Manager":
                        this.updateEmployeeManager();
                        break;
                    case "Remove Employee":
                        this.removeEmployee();
                        break;
                    case "Remove Department":
                        this.removeDepartment();
                        break;
                    case "Remove Role":
                        this.removeRole();
                        break;
                    case "Total Budget by Department":
                        this.totalBudgetByDepartment();
                        break;
                    case "Exit":
                        this.quit();
                        break;
                }
            });
    }

    viewAllDepartments() {
        getAllDepartments().then((departments) => {
            const table = cTable.getTable(departments);
            console.log(table);
            this.getMenu();
        });
    }

    addDepartment() {
        inquirer
            .prompt([{
                type: "input",
                name: "name",
                message: "What is the department name?",
            }, ])
            .then((answer) => {
                addNewDepartment(answer).then((role) => {
                    console.log(role);
                    this.getMenu();
                });
            });
    }

    removeDepartment() {
        getAllDepartments().then((departments) => {
            const departmentChoices = departments.map((department) => {
                return {
                    name: department.department,
                    value: department.id,
                };
            });
            inquirer
                .prompt([{
                    type: "list",
                    name: "id",
                    message: "Which department would you like to remove?",
                    choices: departmentChoices,
                }, ])
                .then((answer) => {
                    const data = departmentChoices.filter(
                        (department) => department.value === answer.id
                    )[0];
                    removeDepartment(data).then((department) => {
                        console.log(department);
                        this.getMenu();
                    });
                });
        });
    }

    viewAllRoles() {
        getAllRoles().then((roles) => {
            const table = cTable.getTable(roles);
            console.log(table);
            this.getMenu();
        });
    }

    addRole() {
        getAllDepartments().then((departments) => {
            const departmentChoices = departments.map((department) => {
                return {
                    name: department.department,
                    value: department.id,
                };
            });
            inquirer
                .prompt([{
                        type: "input",
                        name: "title",
                        message: "What is the name of the role?",
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "What is the salary for this role?",
                    },
                    {
                        type: "list",
                        name: "department_id",
                        message: "Which department does the role belong to?",
                        choices: departmentChoices,
                    },
                ])
                .then((answer) => {
                    addNewRole(answer).then((role) => {
                        console.log(role);
                        this.getMenu();
                    });
                });
        });
    }

    removeRole() {
        getAllRoles().then((roles) => {
            const roleChoices = roles.map((role) => {
                return {
                    name: role.title,
                    value: role.id,
                };
            });
            inquirer
                .prompt([{
                    type: "list",
                    name: "id",
                    message: "Which role would you like to remove?",
                    choices: roleChoices,
                }, ])
                .then((answer) => {
                    const data = roleChoices.filter(
                        (role) => role.value === answer.id
                    )[0];
                    removeARole(data).then((role) => {
                        console.log(role);
                        this.getMenu();
                    });
                });
        });
    }

    viewAllEmployees() {
        getAllEmployees().then((employees) => {
            const table = cTable.getTable(employees);
            console.log(table);
            this.getMenu();
        });
    }

    addEmployee() {
        Promise.all([getAllRoles(), getAllManagers()]).then(
            ([roles, employees]) => {
                const roleChoices = roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id,
                    };
                });
                const managerChoices = employees.map((employee) => {
                    return {
                        name: `${employee.first_name} ${employee.last_name} - ${employee.title}`,
                        value: employee.id,
                    };
                });
                managerChoices.unshift({ name: "None", value: null });
                inquirer
                    .prompt([{
                            type: "input",
                            name: "first_name",
                            message: "What is the employee's first name?",
                        },
                        {
                            type: "input",
                            name: "last_name",
                            message: "What is the employee's last name?",
                        },
                        {
                            type: "list",
                            name: "role_id",
                            message: "What is the employee's role?",
                            choices: roleChoices,
                        },
                        {
                            type: "list",
                            name: "manager_id",
                            message: "Who is the employee's manager?",
                            choices: managerChoices,
                        },
                    ])
                    .then((answer) => {
                        addNewEmployee(answer).then((employee) => {
                            console.log(employee);
                            this.getMenu();
                        });
                    });
            }
        );
    }

    removeEmployee() {
        getAllEmployees().then((employees) => {
            const employeeChoices = employees.map((employee) => {
                return {
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                };
            });
            inquirer
                .prompt([{
                    type: "list",
                    name: "id",
                    message: "Which employee would you like to remove?",
                    choices: employeeChoices,
                }, ])
                .then((answer) => {
                    const data = employeeChoices.filter(
                        (employee) => employee.value === answer.id
                    )[0];
                    deleteEmployee(data).then((employee) => {
                        console.log(employee);
                        this.getMenu();
                    });
                });
        });
    }

    updateEmployeeRole() {
        Promise.all([getAllRoles(), getAllEmployees()]).then(
            ([roles, employees]) => {
                const roleChoices = roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id,
                    };
                });
                const employeeChoices = employees.map((employee) => {
                    return {
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id,
                    };
                });
                inquirer
                    .prompt([{
                            type: "list",
                            name: "id",
                            message: "Which employee would you like to update?",
                            choices: employeeChoices,
                        },
                        {
                            type: "list",
                            name: "role_id",
                            message: "What is the employee's new role?",
                            choices: roleChoices,
                        },
                    ])
                    .then((answer) => {
                        const data = {
                            employee: employeeChoices.filter(
                                (employee) => employee.value === answer.id
                            )[0],
                            role: roleChoices.filter(
                                (role) => role.value === answer.role_id
                            )[0],
                        };
                        updateEmployeesRole(data).then((employee) => {
                            console.log(employee);
                            this.getMenu();
                        });
                    });
            }
        );
    }

    updateEmployeeManager() {
        Promise.all([getAllEmployees(), getAllManagers()]).then(
            ([employees, managers]) => {
                // Get all Manager choices
                const managerChoices = managers.map((manager) => {
                    return {
                        name: `${manager.first_name} ${manager.last_name}`,
                        value: manager.id,
                    };
                });
                // Add the "None" option to the managerChoices array
                managerChoices.unshift({ name: "None", value: null });
                // Get all Employee choices
                const employeeChoices = employees.map((employee) => {
                    return {
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id,
                    };
                });
                inquirer
                    .prompt([{
                            type: "list",
                            name: "id",
                            message: "Which employee would you like to update?",
                            choices: employeeChoices,
                        },
                        {
                            type: "list",
                            name: "manager_id",
                            message: "Who is the employee's new manager?",
                            choices: managerChoices,
                        },
                    ])
                    .then((answer) => {
                        updateEmployeeManager(answer).then((employee) => {
                            console.log(employee);
                            this.getMenu();
                        });
                    });
            }
        );
    }

    viewAllEmployeesByManager() {
        getAllManagers().then((managers) => {
            const managerChoices = managers.map((manager) => {
                return {
                    name: `${manager.first_name} ${manager.last_name}`,
                    value: manager.id,
                };
            });
            inquirer
                .prompt([{
                    type: "list",
                    name: "id",
                    message: "Which manager would you like to view?",
                    choices: managerChoices,
                }, ])
                .then((answer) => {
                    getEmployeesByManager(answer).then((employees) => {
                        const table = cTable.getTable(employees);
                        console.log(table);
                        this.getMenu();
                    });
                });
        });
    }

    viewAllEmployeesByDepartment() {
        getAllDepartments().then((departments) => {
            const departmentChoices = departments.map((department) => {
                return {
                    name: department.department,
                    value: department.id,
                };
            });
            inquirer
                .prompt([{
                    type: "list",
                    name: "department_id",
                    message: "Which department would you like to view?",
                    choices: departmentChoices,
                }, ])
                .then((answer) => {
                    const data = departmentChoices.filter(
                        (department) => department.value === answer.department_id
                    )[0];
                    getEmployeesByDepartment(data).then((employees) => {
                        const table = cTable.getTable(employees);
                        console.log(table);
                        this.getMenu();
                    });
                });
        });
    }

    totalBudgetByDepartment() {
        getAllDepartments().then((departments) => {
            const departmentChoices = departments.map((department) => {
                return {
                    name: department.department,
                    value: department.id,
                };
            });
            inquirer
                .prompt([{
                    type: "list",
                    name: "department_id",
                    message: "Which department would you like to view?",
                    choices: departmentChoices,
                }, ])
                .then((answer) => {
                    getTotalBudget(answer).then((total) => {
                        const table = cTable.getTable(total);
                        console.log(table);
                        this.getMenu();
                    });
                });
        });
    }

};

// Connecting to Database
db.connect((err) => {
    if (err) {
        console.log("Could Not Connect To The Database.");
        console.dir(err);
        return;
    }
    // console.log(data);
    if (err)
        throw err;
    // Start App
    new CMS().getMenu();
})