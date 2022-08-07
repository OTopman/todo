// Assignment!!!

// Create a basic calculator project with four endpoints (APIs) for addition, 
// subtraction, multiplication and division.
// All the API will accept two values from the user 
// and perform arithmetic operation on the numbers received.
// NOTE: Kindly put all forms of validation in order to protect your app from malicious users.
// Happy Hacking 


const http = require('http');
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// API FOR ADDITION
app.post("/api/v1/assignment/addition", (req, res) => {
    let num1 = req.body.number1;
    let num2 = req.body.number2;
    const sum = num1 + num2;
    console.log(sum);

    res.status(202).json({
        status: 'Success',
        message: 'Addition of two numbers executed successfully',
        body: 'The sum of ' + num1 + ' and ' + num2 + ' is ' + sum,
    });

});

// API FOR SUBTRACTION
app.post("/api/v1/assignment/subtraction", (req, res) => {
    let num1 = req.body.number1;
    let num2 = req.body.number2;
    const minus = num1 - num2;
    console.log(minus);


    res.status(202).json({
        status: 'Success',
        message: 'Subtraction of two numbers executed successfully',
        body: 'The subtraction of ' + num1 + ' and ' + num2 + ' is ' + minus,
    });


});

//API FOR MULTIPLICATION
app.post("/api/v1/assignment/multiplication", (req, res) => {
    let num1 = req.body.number1;
    let num2 = req.body.number2;
    const multiplication = num1 * num2;
    console.log(multiplication);


    res.status(202).json({
        status: 'Success',
        message: 'Multiplication of two numbers executed successfully',
        body: 'The multiplication of ' + num1 + ' and ' + num2 + ' is ' + multiplication,
    });


});

// API FOR DIVISION
app.post("/api/v1/assignment/division", (req, res) => {
    let num1 = req.body.number1;
    let num2 = req.body.number2;
    const division = num1 / num2;
    console.log(division);


    res.status(202).json({
        status: 'Success',
        message: 'Division of two numbers executed successfully',
        body: 'The division of ' + num1 + ' and ' + num2 + ' is ' + division,
    });


});



const server = http.createServer(app);
server.listen(4000, function () {
    console.log("server is running at http://localhost:4000");
});