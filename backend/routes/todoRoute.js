// ****************** todoRoute.js *********************


// Import neccessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    const express = require("express"); //Import Express and create a router instance.
    const router = express.Router();
    const { getTodos, addTodo, updateTodo, deleteTodo } = require("../controllers/todoController"); //Import controller functions for CRUD operations.
    const jwtMiddleware = require("../middleware/jwtMiddleware"); // Middleware for JWT
// ----------------------------------------------------------------------------------------------------------------------------


// Protect all to-do routes with JWT:

// GET route to fetch todos, secured with JWT.
// ----------------------------------------------------------------------------------------------------------------------------
    router.get("/todos", jwtMiddleware, (req, res) =>
    {
        console.log("GET /todos - Token validated, fetching todos");
        getTodos(req, res);
    });
// ----------------------------------------------------------------------------------------------------------------------------


// POST route to add a new todo, JWT protected.
// ----------------------------------------------------------------------------------------------------------------------------
    router.post("/todos", jwtMiddleware, (req, res) =>
    {
        console.log("POST /todos - Token validated, adding todo");
        addTodo(req, res);
    });
// ----------------------------------------------------------------------------------------------------------------------------


// PUT route to update a todo by ID, JWT protected.
// ----------------------------------------------------------------------------------------------------------------------------
    router.put("/todos/:id", jwtMiddleware, (req, res) =>
    {
        console.log(`PUT /todos/${req.params.id} - Token validated, updating todo`);
        updateTodo(req, res);
    });
// ----------------------------------------------------------------------------------------------------------------------------


// DELETE route to remove a todo by ID, JWT protected.
// ----------------------------------------------------------------------------------------------------------------------------
    router.delete("/todos/:id", jwtMiddleware, (req, res) =>
    {
        console.log(`DELETE /todos/${req.params.id} - Token validated, deleting todo`);
        deleteTodo(req, res);
    });
// ----------------------------------------------------------------------------------------------------------------------------

module.exports = router; // Export the router for use in the app.
