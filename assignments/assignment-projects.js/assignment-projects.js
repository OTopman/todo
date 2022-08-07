const http = require('http');
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*Create a basic calculator project with four endpoints (APIs) for addition, subtraction, multiplication and division.

All the API will accept two values from the user and perform arithmetic operation on the numbers received.

NOTE: Kindly put all forms of validation in order to protect your app from malicious users.*/


// API FOR ADDITION
app.post("/api/v1/assignment/addition", (req, res) => {
    let num1 = 5;
    let num2 = 6;
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
    let num1 = 8;
    let num2 = 6;
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
    let num1 = 8;
    let num2 = 6;
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
    let num1 = 10;
    let num2 = 5;
    const division = num1 / num2;
    console.log(division);


    res.status(202).json({
        status: 'Success',
        message: 'Division of two numbers executed successfully',
        body: 'The division of ' + num1 + ' and ' + num2 + ' is ' + division,
    });


});

/* John is playing a dice game. The rules are as follows.

Roll two dice.
Add the numbers on the dice together.
Add the total to your overall score.
Repeat this for three rounds.
But if you roll DOUBLES, your score is instantly wiped to 0 and your game ends immediately!

Create a function which takes in a matrix as input, and return John's score after his game has ended.

Notes:

Ignore all other arrays in the matrix if a throw happens to be doubles and go straight to returning 0.
John only has two dice and will always give you outcomes for three rounds.*/


// dice Game API
app.post("/api/v1/dicegame", (req, res) => {

    const arrayMatrix = diceGame([[1, 2], [3, 4], [5, 6]]);
    console.log(arrayMatrix);

    function diceGame(diceGameArray) {
        let result = 0;
        for (let element of diceGameArray) {
            if (element[0] !== element[1]) {
                result += element[0] + element[1]
            }
            else return 0;
        }
        return result;
    }

    res.status(202).json({
        status: 'Success',
        message: 'Dice game executed successfully',
        body: arrayMatrix,
    });


});


/* Create a function that takes an array of numbers and return "Boom!" 
if the digit 7 appears in the array. Otherwise, return "there is no 7 in the array".*/

//BOOM ARRAY API
app.post("/api/v1/boom-number-7", (req, res) => {
    const arrayOfNumbers = sevenBoom(req.body.elements);
    console.log(arrayOfNumbers);


    function sevenBoom(sevenBoomArray) {

        for (let i = 0; i < sevenBoomArray.length; i++) {
            if (sevenBoomArray[i].toString().includes(7)) {
                return "BOOM!";
            }
        }
        return "There is no 7 in the array";

    }

    res.status(202).json({
        status: 'Success',
        message: 'Array of Numbers executed successfully',
        body: arrayOfNumbers,
    });


});

/*Create a function that, given a string with at least three characters, returns an array of its:

1. Length.
2. First character.
3. Last character.
4. Middle character, if the string has an odd number of characters.Middle TWO characters,
 if the string has an even number of characters.
5. Index of the second occurrence of the second character in the format "@ index #" 
and "not found" if the second character doesn't occur again.*/

app.post('/api/v1/about', (req, res) => {
    const { message } = req.body;

    function allAboutStrings(str) {
        const output = [];

        // Get string length
        const length = str.length;
        // Add length to array
        output.push(length);
        // Add first character to the array
        output.push(str[0]);

        // Add last character to the array
        output.push(str[length - 1]);

        // Get the middle characters if the length of the string is even number
        if (length % 2 === 0) {
            const middle = length / 2;
            output.push(`${str[middle - 1]}${str[middle]}`);
        }


        // Get the middle characters if the length of the string is odd number
        if (length % 2 != 0) {
            const index = Math.floor(length / 2);
            output.push(str[index]);
        }

        // Get the index of the occurrence of the second character
        // 0 1 2
        //  a
        const secondElement = str[1];
        const otherElements = str.slice(2);
        // abracadabra
        const index = otherElements.indexOf(secondElement);

        if (index == -1) {
            output.push('not found');
        } else {
            output.push(`@ index ${index + 2}`);
        }

        return output;
    }

    // Send response to client
    res.status(200).json({
        status: 'success',
        message: 'Request completed successfully.',
        data: allAboutStrings(message)
    });
});


const server = http.createServer(app);
server.listen(2000, function () {
    console.log("server is running at http://localhost:2000");
});