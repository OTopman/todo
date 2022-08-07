const express = require('express');
const router = express.Router();

const todos = [];

//! API => Application Programming Interface
//! MVC => Model View Controller

// Ctrl + Shift + L
// Create a todo
router.post("/api/v1/todo", (req, res) => {
    try {
        // const {title, description} = req.body;
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({
                status: 'failed',
                message: 'Title is required!'
            });
        }

        if (!description) {
            return res.status(400).json({
                status: 'failed',
                message: 'Description is required!'
            });
        }

        //! Check if todo already exists
        const existingTodo = todos.find((item) => item.title.toLowerCase() === title.toLowerCase());
        if (existingTodo) {
            return res.status(400).json({
                status: 'failed',
                message: 'Todo already exists.',
            });
        }

        const todo = { title: title, description: description, done: false };

        // Add todo to the repository
        todos.push(todo);

        // Send response to client
        res.status(201).json({
            status: "success",
            message: "Todo created successfully.",
            body: todo,
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: 'Something went wrong!',
        });
    }
});

// Get all todo
router.get("/api/v1/todo", (req, res) => {

    if (todos.length <= 0) {
        return res.status(404).json({
            status: 'failed',
            message: 'No record found.'
        });
    }

    // Send response to client
    res.status(200).json({
        status: "success",
        message: "Todo retrieved successfully.",
        todo: todos,
    });
});

// Get a todo by title
router.get("/api/v1/todo/:title", (req, res) => {
    const { title } = req.params;

    // Find a todo by title
    const result = todos.find((element) => element.title.toLowerCase() === title.toLowerCase());
    if (!result) {
        return res.status(404).json({
            status: 'failed',
            message: 'Todo not found.',
        });
    }

    // Send response to client
    res.status(200).json({
        status: "success",
        message: "Record retrieved successfully.",
        data: result,
    });
});

// Delete a todo by title
router.delete("/api/v1/todo/:title", (req, res) => {
    const title = req.params.title;
    // Find the index of a todo by title
    const index = todos.findIndex((element) => element.title.toLowerCase() === title.toLowerCase());
    if (index == -1) {
        return res.status(404).json({
            status: 'failed',
            message: 'Record not found.',
        });
    }

    // Delete the element at the specified index
    todos.splice(index, 1);

    // Send response to client
    res.status(200).json({
        status: "success",
        message: "Todo removed successfully."
    })
});

// Mark as done
router.put('/api/v1/todo/mark-as-done', (req, res) => {
    let index = -1;
    const todo = todos.find((item, i) => {
        if (item.title.toLowerCase() === req.body.title.toLowerCase()) {
            index = i;
            return item;
        }
    });

    if (index === -1) {
        res.status(404).json({
            status: 'failed',
            message: 'Todo not found.'
        });
    } else {

        if (todo.done) {
            return res.status(400).json({
                status: 'failed',
                message: 'Todo already marked as done.'
            });
        }

        todo.description = todo.description;
        todo.title = todo.title;
        todo.done = true;
        todos.splice(index, 1, todo);
        return res.status(200).json({
            status: 'success',
            message: "Todo marked as done successfully."
        });
    }
});


// Update a todo
router.put('/api/v1/todo/:title', function (req, res) {
    let index = -1;

    if (!req.body.description) {
        return res.status(400).json({
            status: 'failed',
            message: 'Description is required!'
        });
    }

    const todo = todos.find((item, i) => {
        if (item.title.toUpperCase() === req.params.title.toUpperCase()) {
            index = i;
            return item;
        }
    });

    if (index === -1) {
        res.status(404).json({
            status: 'failed',
            message: 'Todo not found.'
        });
    } else {
        todo.description = req.body.description;
        todo.title = req.params.title;
        todo.done = todo.done || false;
        todos.splice(index, 1, todo);
        return res.status(200).json({
            status: 'success',
            message: "Todo edited successfully."
        });
    }
});

module.exports = router;