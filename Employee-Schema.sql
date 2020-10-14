DROP DATABASE IF EXISTS employees_db;
CREATE database employees_db;

USE employees_db;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Smith", 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "Engineer", 50000, 2);

INSERT INTO department(id, name)
VALUES (2, "Engineering");

-- INSERT INTO role (title, salary, department_id)
-- VALUES ("Janitor", 50000, 1);

-- INSERT INTO department (name)
-- VALUES ("Clean");

SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;