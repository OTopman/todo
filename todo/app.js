// Modules
const express = require("express");
const todo = require("./routes/todo");
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', todo);

app.all('*', (req, res) => { 
  return res.status(400).json({
    status: 'failed',
    message: `${req.originalUrl} not found.`
  });
});

module.exports = app;

