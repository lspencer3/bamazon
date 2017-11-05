

var mysql = require("mysql");
var inquirer = require("inquirer")
var itemID;
var itemCount;
var quantity;
var updateSales;
var updatedSales;
var sales;
var revenue;
var price;
var itemName;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

console.log("\nItems for sale are listed below...\n")

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  //checkQuantity();
  queryAllProducts()
  Q1();
});



function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if(err){
      console.log(err)
    }
    else{
    console.log("\nItem ID | Item Name | Price |")
    for (var i = 0; i < res.length; i++) {
      console.log("\n"+res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price + " | ");
    }
    console.log("-----------------------------------");
  }
  });
};



function Q1(){
  inquirer.prompt([
  {
    message: "Enter the ID for the product you would like to purchase.",
    name: "productId",
    type: "input"
  }
    ]).then(function(res){
    //console.log(res)
    itemID = parseInt(res.productId)
    itemCount = parseInt(res.unitCount)
    //console.log(itemID)
    checkQuantity()
    Q2()
  })

};

function checkQuantity() {
    var query = connection.query("SELECT * FROM products WHERE item_id=?", [itemID], function(err, res){
        if (err){
            console.log(err)
        }
        else{
            //console.log(res[0].stock_quantity)
            //console.log(query.sql)
            quantity = res[0].stock_quantity
            itemName = res[0].product_name
            price = parseInt(res[0].price)
            sales = parseInt(res[0].product_sales)
            //console.log(quantity)
            //console.log(itemCount)
        } 
    })
}


function Q2(){
  inquirer.prompt([
  {
    message: "How many do you need to buy?",
    name: "unitCount",
    type: "input"
  }
    ]).then(function(res){
    //console.log(res)
    itemCount = parseInt(res.unitCount)
    generateOrder()
  })

};

function generateOrder(){
    if (quantity >= itemCount){
        console.log("\nGenerating your Order for " + itemCount + " " + itemName + "!")
        console.log("\nTotal Cost of order: " + "$" +itemCount*price + "\n")
        var diff = quantity - itemCount
        query = connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [diff,itemID], function(err,resp){
            if(err){
                console.log(err)
            }
            else{
                //console.log(query.sql)
                updateSalesAmount();
            }
        })
    }
    else{
        console.log("Insufficient quantity!")
        //console.log(quantity)
        connection.end()
    }
};

function updateSalesAmount(){
    revenue = price * itemCount
    updateSales = sales + revenue
    //console.log(typeof(updateSales))
    //console.log(revenue,price,itemCount,sales,updateSales)
    query = connection.query("UPDATE products SET product_sales=? WHERE item_id=?", [updateSales,itemID], function(err,resp){
        if(err){
            console.log(err)
        }
        else{
            //console.log(query.sql)
        }
    connection.end()
    })
}



