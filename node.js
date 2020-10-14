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
    database: "top_songsDB"
});

connection.connect(function (err) {
    if (err) throw err;
    main();
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
    query += "FROM employee INNER JOIN role ON (employee.id = role.id AND top_albums.year) ";
    query += "FROM employee INNER JOIN department ON (employee.id = department.id AND top_albums.year) ";
    query += "ORDER BY employee.id";

    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(
                i + 1 + ".) " +
                "Year: " +
                res[i].id +
                " Album Position: " +
                res[i].first_name +
                " || Artist: " +
                res[i].last_name +
                " || Song: " +
                res[i].title +
                " || Album: " +
                res[i].department +
                " || Song: " +
                res[i].salary +
                " || Song: " +
                res[i].manager
                
            );
        }
    });
}

function add() {
    console.log("Inserting a new product...\n");
    var query = connection.query(
      "INSERT INTO employees SET ?",
      {
        flavor: "Rocky Road",
        price: 3.0,
        quantity: 50
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " product inserted!\n");
        // Call updateProduct AFTER the INSERT completes
        updateProduct();
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
}