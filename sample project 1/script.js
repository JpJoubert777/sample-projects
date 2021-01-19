const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
//Configuring express server
app.use(bodyparser.json());

//MySQL details
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'megabooks',
    multipleStatements: true
});

mysqlConnection.connect((err)=> {
    if(!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});


//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//GET request to fetch all the customer details from the MySQL Database
app.get('/customer' , (req, res) => {
mysqlConnection.query('SELECT * FROM customers', (err, rows, fields) => {
    if (!err)
        res.send(rows);
    else
        console.log(err);
    })
} );

 //INSERT a customer's detail
app.post('/customer', (req, res) => {
    let cust = req.body;
    var sql = "SET @customer_id = ?;SET @first_name = ?;SET @last_name = ?;SET @email = ?; \
    CALL addOrEdit(@customer_id,@first_name,@last_name,@email);";
    mysqlConnection.query(sql, [cust.customer_id, cust.first_name, cust.last_name, cust.email], (err, rows, fields) => {
    if (!err)
        rows.forEach(element => {
            if(element.constructor == Array)
                res.send('New customer ID : '+ element[0].customer_id);
        });
    else
        console.log(err);
    })
});   


//UPDATE a customer's detail
app.put('/customer', (req, res) => {
    let cust = req.body;
    var sql = "SET @customer_id = ?;SET @first_name = ?;SET @last_name = ?;SET @email = ?; \
    CALL addOrEdit(@customer_id,@first_name,@last_name,@email);";
    mysqlConnection.query(sql, [cust.customer_id, cust.first_name, cust.last_name, cust.email], (err, rows, fields) => {
    if (!err)
        res.send('Learner Details Updated Successfully');
    else
        console.log(err);
    })
});


//DELETE a customer's detail
app.delete('/customer/:id', (req, res) => {
mysqlConnection.query('DELETE FROM customers WHERE customer_id = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
        res.send('customer record deleted successfully.');
    else
        console.log(err);
    })
});