CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE  products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NULL,
  price VARCHAR(15) NOT NULL,
  stock_quantity INT NULL,
  product_sales INT DEFAULT 0 NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("iPhone X", "Electronics", 999.00, 24), ("Monopoly", "Games", 20.00, 40), ("Bose Soundbar and Speaker System","Electronics",1500.00,8),("Socks-Pink", "Clothes", 5.00,87),("Gryffindor T-Shirts", "Clothes", 30.00, 40);

USE bamazon;

CREATE TABLE  departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs INT DEFAULT 0 NULL,
  PRIMARY KEY (department_id)
);


INSERT INTO departments (department_name, over_head_costs) 
VALUES ("Pet", 100 ),("Electronics", 300),("Clothes", 200);