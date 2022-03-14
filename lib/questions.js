const inquirer = require("inquirer");
var figlet = require("figlet");
const {
    getAllDepartments,
    addNewDepartment,
    removeDepartment,
    getTotalBudget,
} = require("./departments");
const { getAllRoles, addNewRole, removeARole } = require("./roles");
const {
    getAllEmployees,
    addNewEmployee,
    deleteEmployee,
    updateEmployeesRole,
    getEmployeesByDepartment,
    getEmployeesByManager,
    getAllManagers,
    updateEmployeeManager,
} = require("./employees");
const cTable = require("console.table");

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
        // To view departments, get departments from db then write in table, repeat
    viewAllDepartments() {
            getAllDepartments().then((departments) => {
                const table = cTable.getTable(departments);
                console.log(table);
                this.getMenu();
            });
        }
        // To add department ask user for department name then insert with sql
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
        // to delete department, get departments by id, ask user which department to delete then filter choices
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

    quit() {
        figlet("Goodbye!", function(error, data) {
            if (error) {
                console.log("Something went wrong...");
                console.dir(err);
                return;
            }
            console.log(data);
            process.exit();
        });
    }
}

module.exports = CMS;