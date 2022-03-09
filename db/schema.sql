CREATE TABLE department (
     id INTEGER AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(30)
);

CREATE TABLE roles (
     id INTEGER AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(30),
     salary DECIMAL,
     department_id INT
);

CREATE TABLE employee (
     id INTEGER AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(30),
     last_name VARCHAR(30),
     role_id INT,
     manager_id INT
     CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);