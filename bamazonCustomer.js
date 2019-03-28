var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 8889
    port: 8889,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "greatBay_DB"
  });