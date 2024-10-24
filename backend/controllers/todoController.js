// ****************** todoController.js *********************


// Mock data for demonstration purposes.
// ----------------------------------------------------------------------------------------------------------------------------
    let todos =
    [
        { _id: 1, task: "Do homework", completed: false },
        { _id: 2, task: "Walk the dog", completed: true },
    ];
// ----------------------------------------------------------------------------------------------------------------------------

// Get all todos.
// ----------------------------------------------------------------------------------------------------------------------------
    exports.getTodos = (req, res) =>
    {
        res.status(200).json(todos);
    };
// ----------------------------------------------------------------------------------------------------------------------------

// Add a new todo.
// ----------------------------------------------------------------------------------------------------------------------------
    exports.addTodo = (req, res) =>
    {
        const { task } = req.body;

        if (!task || task.length > 140)
        {
            return res.status(400).json({ message: "Task is required and must be less than 140 characters." });
        }

        const newTodo =
        {
            _id: todos.length + 1,
            task,
            completed: false
        };

        todos.push(newTodo);
        res.status(201).json(newTodo);
    };
// ----------------------------------------------------------------------------------------------------------------------------


// Update a todo.
// ----------------------------------------------------------------------------------------------------------------------------
    exports.updateTodo = (req, res) =>
    {
        const { id } = req.params;
        const { task, completed } = req.body;

        const todo = todos.find(t => t._id == id);
        if (!todo)
        {
            return res.status(404).json({ message: "Todo not found" });
        }

        if (task && task.length > 140)
        {
            return res.status(400).json({ message: "Task must be less than 140 characters." });
        }

        todo.task = task || todo.task;
        todo.completed = completed !== undefined ? completed : todo.completed;

        res.status(200).json(todo);
    };
// ----------------------------------------------------------------------------------------------------------------------------


// Delete a todo.
// ----------------------------------------------------------------------------------------------------------------------------
    exports.deleteTodo = (req, res) =>
    {
        const { id } = req.params;

        const index = todos.findIndex(t => t._id == id);
        if (index === -1)
        {
            return res.status(404).json({ message: "Todo not found" });
        }

        todos.splice(index, 1);
        res.status(200).json({ message: "Todo deleted successfully" });
    };
// ----------------------------------------------------------------------------------------------------------------------------
