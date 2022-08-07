// John is playing a dice game. The rules are as follows.

// Roll two dice.
// Add the numbers on the dice together.
// Add the total to your overall score.
// Repeat this for three rounds.
// But if you roll DOUBLES, your score is instantly wiped to 0 and your game ends immediately!

// Create a function which takes in a matrix as input, and return John's score after his game has ended.

// Notes:

// Ignore all other arrays in the matrix if a throw happens to be doubles and go straight to returning 0.
// John only has two dice and will always give you outcomes for three rounds.

const http = require('http');
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/api/v1/dicegame", (req, res) => {
    const inputElement = req.body.elements;

    const arrayMatrix = diceGame(inputElement);
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

    // function diceGame(diceGameArray) {
    //     let result = 0;
        
    //     for (let row = 0; row < diceGameArray.length; row++) {
    //         const outerElement = diceGameArray[row]; //! [1, 2]
    //         for (let col = 0; col < outerElement.length; col++) {
    //             const element = outerElement[col];
    //             const element2 = outerElement[outerElement.length - col - 1]
    //             // if(element == element2)
    //             if (element !== element2) {
    //                 if (col == outerElement.length - 1) break;
    //                 result += element + element2;
    //             } else {
    //                 result = 0;
    //                 break;
    //             }
    //         }
    //     }
    //     return result;
    // }

    res.status(202).json({
        status: 'Success',
        message: 'Dice game executed successfully',
        body: arrayMatrix,
    });


});





const server = http.createServer(app);
server.listen(2000, function () {
    console.log("server is running at http://localhost:2000");
});