-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db; 
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "people" within animals_db --
CREATE TABLE product (
 
    item_id INT NOT NULL AUTO_INCREMENT,
    
    product_name VARCHAR(100) NOT NULL,
    
    department_name VARCHAR(100) NOT NULL,
    
    price  INT default 0,

    stock_quantity INT default 0,   --INTEGER(10) whats the difference

    PRIMARY KEY (id)    

);
INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("BMI", "Electronics", 1200, 100);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Apple", "Electronics", 1100, 100);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Alienware", "Electronics", 1000, 100);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("HP", "Electronics", 950, 100);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Chrome", "Electronics", 900, 100);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Dell", "Electronics", 850, 100);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Lenovo", "Electronics", 800, 100);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Asus", "Electronics", 750, 100);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Samsung", "Electronics", 700, 100);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Acer", "Electronics", 650, 100);
