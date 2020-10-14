var mysql = require("mysql");
var inquirer = require("inquirer");
const { createPromptModule } = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "top_songsDB"
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
          // add();
          break;

        case "View departments, roles, employees":
          view();
          break;

        case "Update employee roles":
          // update();
          break;

        case "Quit":
          // connection.end();
          break;
      }
    });
}

function view() {
  var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary ";
  query += "FROM employee LEFT JOIN role ON (employee.id = role.id) ";
  query += "FROM employee LEFT JOIN department ON (role.id = department.id) ";
  query += "ORDER BY employee.id";

  var query = "SELECT * FROM employee, role, department ";
  query += "WHERE employee.id = role.id ";
  query += "AND employee.id = department.id";

  connection.query(query, function (err, res) {
    console.table(res)
    // for (var i = 0; i < res.length; i++) {
    //     console.log(
    //         i + 1 + ".) " +
    //         "Id: " +
    //         res[i].id +
    //         " First_name: " +
    //         res[i].first_name +
    //         " || Last_name " +
    //         res[i].last_name +
    //         " || Role: " +
    //         res[i].title +
    //         " || Deparment_id: " +
    //         res[i].department +
    //         " || Salary: " +
    //         res[i].salary +
    //         " || Manager_id: " +
    //         res[i].manager

    //     );
    // }
  });
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
        message: "What is their role?"
      }
    ])
    .then(function (answer) {

      var query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          // role: 50 TODO:
        },
        function (err, res) {
          if (err) throw err;
        }
      );
      
    
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
      }
    ])
    .then(function (answer) {

      var query = connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
        },
        function (err, res) {
          if (err) throw err;
        }
      );
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
      "INSERT INTO role SET ?",
      {
        name: answer.name,
      },
      function (err, res) {
        if (err) throw err;
      }
    );
  });
}

// function update() {
// inquirer
// .prompt({
//   name: "update",
//   type: "list",
//   message: "What would you like to update?",
//   choices: [
//     "Add departments, roles, employees",
//     "View departments, roles, employees",
//     "Update employee roles",
//     "Quit"
// ]
// })
// .then(function (answer) {
// switch (answer.action) {
//     case "Add departments, roles, employees":
//         // add();
//         break;

//     case "View departments, roles, employees":
//         view();
//         break;

//     case "Update employee roles":
//         // update();
//         break;

//     case "Quit":
//         // connection.end();
//         break;
// }
// var query = connection.query(
//   "UPDATE products SET ? WHERE ?",
//   [
//     {
//       quantity: 100
//     },
//     {
//       flavor: "Rocky Road"
//     }
//   ],
//   function(err, res) {
//     if (err) throw err;
//   }
// );

// }

main();