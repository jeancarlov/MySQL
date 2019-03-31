var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 8889
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    // if there is an error ...
    if (err) throw err;
    // sucesss message
    console.log("connected as id " + connection.threadId);
    // gracefully end this connection and back to the terminal.
    queryAllProducts();
    listOfQuestions();
    // connection.end();

});

function queryAllProducts() {
    connection.query("SELECT * FROM product", function (error, res) {
        if (error) throw error;
        // code to enhance the structure of the table display in node.
        var table = new Table({
            head: ["ID", "Name", "Department", "Price", "In Stock"],
            colWidths: [10, 20, 20, 20, 10]
        });
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id , res[i].product_name, res[i].department_name, res[i].price,res[i].stock_quantity]
            );
        }

        // console.log("-----------------------------------");
        console.log(table.toString());
        // listOfQuestions();
    });


}

// function to handle posting new items up for auction
function listOfQuestions() {
    // prompt for info about the item being put up for auction
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the ID of the item you like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) { // this is avalidation 
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) { // this is avalidation 
                        return true;
                    }
                    return false;
                }
            },
        ])
        .then(function (answer) {
            // update the product list related to the response
            connection.query('SELECT * FROM `product` WHERE `item_id` = ?', [answer.item], function (error, res, fields) {
                if (error) throw error;
                // console.log(res[0].stock_quantity); this ckeck the query and the total quantity of stock before the update
                if (answer.quantity < res[0].stock_quantity) {
                    connection.query(
                        "UPDATE `product` SET ? WHERE ?",
                        [
                            {
                                stock_quantity: parseInt(res[0].stock_quantity - answer.quantity),
                            },
                            {
                                item_id: answer.item// here is where we are relying in our uniquie id  
                            }
                        ],
                    )
                    console.log(`Thank you, your ${answer.quantity} items are ready to checkout.`);
                    console.log(`Our current in stock total: ${res[0].stock_quantity}`); // ckeck why is this one not giving me the current total!!!!
                    queryAllProducts();
                    connection.end();
                    listOfQuestions()
                    // connection.end();
                } else if (answer.quantity > res[0].stock_quantity) {
                    console.log("Sorry our maximum quantity is 100");
                    connection.end();
                    listOfQuestions();

                }

            });
        })
}


