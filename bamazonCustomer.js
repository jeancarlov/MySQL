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
    queryAllProducts();
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
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(table.toString());
        firstQuestions();
    });


}

// function to handle users choices
function firstQuestions() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "list",
                message: "Do you want a [Purchase] something from the list of products, or [Exit]?",
                choices: ["Purchase", "Exit"],
            },
        ]).then(function (answer) {
            if (answer.item === "Purchase") {
                purchase();
            } else {
                console.log("Goodbye");
                connection.end();
                
            }
        })
}

function purchase() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the ID of the item you want to purchase?",
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
                message: "How many you want to purchase?",
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
            connection.query('SELECT * FROM `product` WHERE `item_id` = ?', [answer.item], function (error, res) {
                if (error) throw error;
                // console.log(res[0].stock_quantity); This is to ckeck the query and the total quantity of stock before the update
                if (answer.quantity < res[0].stock_quantity) {
                    connection.query(
                        "UPDATE `product` SET ? WHERE ?",
                        [
                            {
                                stock_quantity: parseInt(res[0].stock_quantity - answer.quantity),
                                // product_sales: parseInt((res[0].price * answer.quantity) + res[0].product_sales)

                            },
                            {
                                item_id: answer.item// here is where we are relying in our uniquie id  
                            }
                        ],
                        
                    )
                    console.log(`Thank you, your ${answer.quantity} items are ready to checkout.`);
                    console.log(`Our current in stock total: ${res[0].stock_quantity - answer.quantity}`); 
                    console.log((`List of items total price: $${(res[0].price * answer.quantity)} dollars. `));
                    
                    queryAllProducts();
                    

                } else if (answer.quantity > res[0].stock_quantity) {
                    // console.log("Sorry our maximum quantity is 100");
                    console.log(`Sorry our maximum quantity is ${res[0].stock_quantity}`);
                    queryAllProducts();
                }

            });
        })
}





