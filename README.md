# bamazon


consists of 3 files to use in the terminal

first run bamazon.sql in mysql workbench or some other database design tool to enter demo data


bamazonCustomer.js
bamazonManager.js
bamazonSupervisor.js


See below for how each operates
	
	bamazonCustomer:
		displays all available products for purchases
		the user is them prompted to enter the id of the product they would like to buy

	bamazonManager:
		has 4 options: view all products for sale, check low inventory, add a product, add inventory
		viewing all products displays the products avialble for sale with no user input needed
		check low inventory displays all inventory with stock quantity under 5 units with no user input needed
		add a product prompts the user to enter the product name, department, and price to push this to the database
		add inventory prompts the user to enter which product they want to update and how many more units they are adding

	bamazonSupervisor:
		has 2 option: view sales by deparment and add a department
		view sales by department diplays a table with sales by department with no user input
		add a department prompts the user for the department name and over head cost to push that information to the database

See video of demo on this