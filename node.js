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
                    // view();
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