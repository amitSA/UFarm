//arjun's 169.233.193.211
var app = require("../app");
var mysql = require("mysql");

var tableName = "list";


var connection = mysql.createConnection( {
   host: "169.233.193.211",
   user: "test",
   password: "arjun123",
   database: "u-farm"
});

var endConnection = function (conn) {
   conn.end(function (err) {
      if (err) {
         console.log("Connectino Unsucessfully ended");
         return;
      }
         // The connection is terminated gracefully
         // Ensures all previously enqueued queries are still
         // before sending a COM_QUIT packet to the MySQL server.
   });
}


app.get("/query", function (req, res, next) {
   //console.log("\n req ip address: " + req.ip);
   console.log(req.query.Rental);
   var connection = mysql.createConnection({
      host: "169.233.193.211",
      user: "test",
      password: "arjun123",
      database: "u-farm"
   });
   connection.connect(function (err) {
      if (err) {
         console.log("Error connection to database, error: " + err);
         return;
      }
      console.log("Connection Succesfully Established");
      var sqlQuery = "SELECT * FROM " + tableName;
      if (req.query.Rental != "All_Categories") {
         sqlQuery += " WHERE Rental='" + req.query.Rental + "'";
      }
      console.log("query: " + sqlQuery);
      connection.query(sqlQuery, function (err, rows) {
         if (err) {
            console.log("Error in queing from table, error: " + err);
         } else {
            //console.log("Recieved Data from table: \n" + JSON.stringify(rows,null,2));
         }
         //end connection
         endConnection(connection);
         res.send(rows);
      });
   });
   // res.send("<h1>In Search route</h1>")
   //areq.params.category
});
