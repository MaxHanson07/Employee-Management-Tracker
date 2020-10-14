var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employees_db"
});

connection.connect(function (err) {
  if (err) throw err;
});

function main() {
  console.log("main");
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add departments, roles, employees",
        "View departments, roles, employees",
        "Update employee roles",
        "Quit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add departments, roles, employees":
          add();
          break;

        case "View departments, roles, employees":
          view();
          break;

        case "Update employee roles":
          update();
          break;

        case "Quit":
          connection.end();
          break;
      }
    });
}

function view() {

  var query = "SELECT * FROM employee, role, department ";

  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.table(
        "Id: " +
        res[i].id +
        " First_name: " +
        res[i].first_name +
        " || Last_name " +
        res[i].last_name +
        " || Role: " +
        res[i].title +
        " || Deparment_id: " +
        res[i].department_id +
        " || Salary: " +
        res[i].salary
      );
    }
  });
  main();
}

function add() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to create?",
      choices: [
        "Employee",
        "Role",
        "Department"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Employee":
          createEmployee();
          break;

        case "Role":
          createRole();
          break;

        case "Department":
          createDepartment();
          break;
      }
    });
}

function createEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is their last name?"
      },
      {
        name: "role",
        type: "input",
        message: "What is the id# of their role?"
      }
    ])
    .then(function (answer) {
      console.log("answer.first_name: " + answer.first_name)

      var query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,        
          last_name: answer.last_name,
          role_id: answer.role
        },
        function (err, res) {
          if (err) throw err;
        }
      );

      main();
    });

}

function createRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the role?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of the role?"
      },
      {
        name: "department",
        type: "input",
        message: "What is the id number of the department containing this role?"
      }
    ])
    .then(function (answer) {

      var query = connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department
        },
        function (err, res) {
          if (err) throw err;
        }
      );
      main();
    });
   
}

function createDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the department name?"
      }
    ])
    .then(function (answer) {

      var query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.name,
        },
        function (err, res) {
          if (err) throw err;
        }
      );
      main();
    });
   
}

function update() {
  inquirer
    .prompt({
      name: "update",
      type: "list",
      message: "What would you like to update?",
      choices: [
        "Employees",
        "Roles",
        "Departments"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Employees":
          updateEmployee();
          break;

        case "Roles":
          updateRole();
          break;

        case "Departments":
          updateDeparment();
          break;

      }
    })
}

function updateEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is their last name?"
      },
      {
        name: "role",
        type: "input",
        message: "What is the id number of their role?"
      }
    ])
    .then(function (answer) {

      var query = connection.query(
        "UPDATE employee SET ? WHERE ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role: answer.role
        },
        function (err, res) {
          if (err) throw err;
        }
      );
    });
    main();
}

function updateRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the role?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of the role?"
      }
    ])
    .then(function (answer) {

      var query = connection.query(
        "UPDATE role SET ? WHERE ?",
        {
          title: answer.title,
          salary: answer.salary,
        },
        function (err, res) {
          if (err) throw err;
        }
      );
    });
    main();
}

function updateDeparment() {
  inquirer
  .prompt([
    {
      name: "name",
      type: "input",
      message: "What is the department name?"
    }
  ])
  .then(function (answer) {

    var query = connection.query(
      "UPDATE department SET ? WHERE ?",
      {
        name: answer.name,
      },
      function (err, res) {
        if (err) throw err;
      }
    );
  });
  main();
}

main();