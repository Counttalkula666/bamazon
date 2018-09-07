//BAMAZON APP

//use nodemom to restart server

//DEPENDANCIES
var mysql = require("mysql");
var inquirer = require("inquirer");

//SERVER CONNECTION
var connection = mysql.createConnection({
    host: "localhost",
  
    // My port
    port: 3306,
  
    // My username
    user: "root",
  
    // My password
    password: "bootcamp",
    database: "bamazon_database"
  });
  
  //SQL / MYSQL CONNECTION
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

  //Display inventory
function getAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    //console.log(res[0]); 
  //Loop over the product array and console log the result for the user in a different format    
    for (var i = 0; i < res.length; i++) {
      console.log ("Item Id: " + res[i].item_id + "  Product: " + res[i].product_name + "  Department Name: " + res[i].department_name + "  Price: " + res[i].price + "  Stock Quantity: " + res[i].stock_quantity);
  }
  //Call function that asks for user input
  inquirer.prompt([
    {
      type: 'input',
      name:'item_id', 
      message:'Please enter Item Id'
    },
    {
      type: 'input',
      name:'quantity', 
      message:'Please enter Quantity Desired'
    }
  ]).then(function(answers) {
    console.log(answers);
    var record;
    for(var i = 0; i < res.length; i++) {
      if(res[i].item_id === + answers.item_id) {
        record = res[i];
      }
    }
  //Positive answer
  //Total cost problem- Need to calculate and display total correctly...still having minor problems
  //declare variable prior to console log and use concatenation to add it to the string
  var price = quantity*productData.price;  
  console.log(record);
    if(record.stock_quantity >= answers.quantity) {
      console.log("We have that product available, your transaction total is" + ());
      //Use an SQL update to update the database w current stock levels
    connection.query(
      "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: (record.stock_quantity - answers.quantity)
          },
          {
            item_id: record.item_id
          }
        ],
        function(err, res) {
          console.log(res);
          console.log(res.affectedRows + " Your transaction is complete, product stock levels updated!\n");
          
        }
      );
      
    }
    else {
      console.log('Insufficient Quantity');
    }
   
    }
  );


  });
};

getAllProducts();
