var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
var newDepartment;
var newCost;
var departmentArr = [];

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

inquirer.prompt([
  {
    message: "Menu Options",
    name: "chosenOption",
    type: "list",
    choices: ["View Product Sales by Department","Create New Department"]
  }
    ]).then(function(res){
    console.log(res)
    var opt = res.chosenOption
    if (opt === "View Product Sales by Department"){
      viewProduct()

    }
    else if(opt === "Create New Department"){
        createDepartment()
    }
  })


function viewProduct(){
    var query = connection.query("SELECT * FROM products p INNER JOIN departments d ON p.department_name=d.department_name ", function(err, res) {
        if (err){
            console.log(err)
        }
        else {
            //console.log(res)
            //console.log(query.sql)
            console.log("\n")
            for(var i = 0; i < res.length; i++){
            console.table([
                    {
                      Department_Id: res[0].department_id,
                      Department_Name: res[0].department_name,
                      Over_Head_Costs: res[0].over_head_costs,
                      Product_Sales: res[0].product_sales,
                      Total_Profit: res[0].total_profit
                    },
                ])
            }
        }
      connection.end()
    })
}; 


function createDepartment(){
  console.log("Answer the following questions to create a new department")
  inquirer.prompt([
  {
    message: "Enter department name",
    name: "department",
    type: "input",
  },
  {
    message: "Enter over head cost",
    name: "cost",
    type: "input",
  }
    ]).then(function(res){
      console.log(res)
      newDepartment = res.department
      newCost = res.cost
      departmentArr.push(newDepartment)
      departmentArr.push(newCost)
      //console.log(departmentArr)
      var VALUES = [];
      VALUES.push(departmentArr)
      query = connection.query("INSERT INTO departments (department_name,over_head_costs) VALUES ?", [VALUES], function(res,err){
        if (err){
          console.log(err)
        }
        else{
        console.log("this is done")
        //console.log(query.sql)
        }
      })
      connection.end()
});
}
