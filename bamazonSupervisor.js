var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
var newDepartment;
var newCost;
var departmentArr = [];
var totalSalesPet;
var totalSalesEle;
var totalSalesHom;
var totalSalesClo;
var totalSalesArr = [];

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});
function begin(){
var query = connection.query("SELECT * FROM products p INNER JOIN departments d ON p.department_name=d.department_name", function(err,res){
  totalSalesEle = 0;
  totalSalesPet = 0;
  totalSalesClo = 0;
  totalSalesHom =0;
  //console.log(res)
  for (var i = 0; i < res.length; i++){
        if (res[i].department_id === 1){
          totalSalesPet += parseInt(res[i].product_sales)
        }
        else if (res[i].department_id === 2){
          totalSalesEle += parseInt(res[i].product_sales)
        }
        else if (res[i].department_id === 3){
          totalSalesClo += parseInt(res[i].product_sales)
        }
        else if (res[i].department_id === 4){
          totalSalesHom += parseInt(res[i].product_sales)
        }
    }
    //console.log(totalSalesPet,totalSalesEle,totalSalesHom,totalSalesClo)
    totalSalesArr.push(totalSalesPet)
    totalSalesArr.push(totalSalesEle)
    totalSalesArr.push(totalSalesClo)
    totalSalesArr.push(totalSalesHom)
})


inquirer.prompt([
  {
    message: "Menu Options",
    name: "chosenOption",
    type: "list",
    choices: ["View Product Sales by Department","Create New Department", "End Session"]
  }
    ]).then(function(res){
    //console.log(res)
    var opt = res.chosenOption
    if (opt === "View Product Sales by Department"){
      viewProduct()

    }
    else if(opt === "Create New Department"){
        createDepartment()
    }
    else if (opt === "End Session"){
      return
    }
  })
}
begin();
function viewProduct(){
    query = connection.query("SELECT d.department_id, d.department_name, d.over_head_costs FROM products p INNER JOIN departments d ON p.department_name=d.department_name GROUP BY d.department_name, d.department_id ORDER BY d.department_id ASC", function(err, res) {
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
                      Department_Id: res[i].department_id,
                      Department_Name: res[i].department_name,
                      Over_Head_Costs: res[i].over_head_costs,
                      Product_Sales: totalSalesArr[i],
                      Total_Profit: totalSalesArr[i]-parseInt(res[i].over_head_costs)
                    },
                ])
            }
        }
      connection.end()
    })
}; 


function createDepartment(){
  console.log("\nAnswer the following questions to create a new department")
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
      console.log(departmentArr)
      var VALUES = [];
      VALUES.push(departmentArr)
      query = connection.query("INSERT INTO departments (department_name,over_head_costs) VALUES ?", [VALUES], function(err,res){
        if (err){
          console.log(err)
        }
        else{
        console.log("this is done")
        console.log(query.sql)
        }
      })
      connection.end()
  });
  //begin();
}
