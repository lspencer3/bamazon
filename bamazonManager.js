

var mysql = require("mysql");
var inquirer = require("inquirer")
var optionChosen;
var products=[];
var product;
var newProduct;
var newProductValues = [];
var price;
var department;
var inventory;
var itemID;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.query("SELECT product_name FROM products", function(err, res) {
  for (var i =0; i < res.length; i++){
    products.push(res[i].product_name)
  }
})


function queryAllProducts(){

  connection.query("SELECT * FROM products", function(err, res) {
    console.log("\nItem ID | Item Name | Price | Stock Quantity | ")
    for (var i = 0; i < res.length; i++) {
      console.log("\n"+res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price + " | "+ res[i].stock_quantity +" units | ");
    }
    console.log("-----------------------------------");
    connection.end()
  });

};


 Qs();

function Qs(){
    inquirer.prompt([
    {
      message: "Menu Options",
      name: "optionChosen",
      type: "list",
      choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
    }
      ]).then(function(res){

      //console.log(res)

      optionChosen = res.optionChosen

      if(optionChosen === "View Products for Sale"){
        console.log("\nViewing all Products...\n")
        queryAllProducts()
      }

      else if(optionChosen === "View Low Inventory"){
      checkLowInv();
      }

      else if(optionChosen==="Add to Inventory"){
      addInventory()
      }

      else if (optionChosen==="Add New Product"){
      addProduct()
      }
  })
};

function checkLowInv() {
  var query = connection.query("SELECT * FROM products WHERE stock_quantity<5", function(err, res) {
      //console.log(res)
      //console.log(query.sql)
      console.log("\nViewing Low Inventory\n")
      for (var i = 0; i < res.length; i++) {
      console.log("\n"+res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price + " | "+ res[i].stock_quantity +" units | ");
    }
    console.log("-----------------------------------");
    connection.end()
    })
  };

function addInventory(){
  inquirer.prompt([
    {
      message: "Which product are you updating?",
      name: "productChosen",
      type: "list",
      choices: products
    }
  ]).then(function(res){
        var productChosen = res.productChosen
        console.log(productChosen)
        query = connection.query("SELECT * FROM products WHERE product_name=?",[productChosen],function(err,res){
            if (err){
              console.log(err)
              console.log("hello")
              console.log(query.sql)
            }
            else{
              //console.log(res[0].stock_quantity)
              inventory = parseInt(res[0].stock_quantity)
              itemName = res[0].product_name
              itemID = res[0].item_id
              console.log("\nCurrent Inventory Count for " + itemName + ": " + inventory)
            }
        })
      addInventory2()
   })
}

function addInventory2(){
  inquirer.prompt([
    {
      message: "Enter the amount of the additional inventory?",
      name: "units",
      type: "input",
    }
  ]).then(function(res){
      //console.log(res)
      inventory += parseInt(res.units) 
      //console.log(inventory)
      query = connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [inventory, itemID], function(err,res){
        if (err){
          console.log(err)
        }
        else {
          console.log("\nNew Inventory Count for " + itemName + ": " + inventory + "\n")
        }
      })
      connection.end()
  })
}

function addProduct(){
  console.log("\nAnswer the following questions to add a new product")
  inquirer.prompt([
  {
    message: "Enter product name",
    name: "product",
    type: "input",
  },
  {
    message: "Enter product department",
    name: "department",
    type: "input",
  },
  {
    message: "Enter product price",
    name: "price",
    type: "input"
  },
  {
    message: "Enter product inventory amount",
    name: "units",
    type: "input"
  }
    ]).then(function(res){
      console.log(res)
      newProduct = res.product
      department = res.department
      price = res.price
      inventory = res.units


      newProductValues.push(newProduct)
      newProductValues.push(department)
      newProductValues.push(price)
      newProductValues.push(inventory)
      //console.log(newProductValues)
      var VALUES = [];
      VALUES.push(newProductValues)
      query = connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?", [VALUES], function(err,res){
        if (err){
          console.log(err)
        }
        else{
        //console.log("this is done")
        //console.log(query.sql)
        }
      })
    connection.end()
  });

}


