// ****************** TodoApp.js *********************


// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React, { useState, useEffect } from "react";
    import AddTodo from "./AddTodo";
    import TodoList from "./TodoList";
    import axios from "axios";
    import "../styles/TodoApp.css";
// ----------------------------------------------------------------------------------------------------------------------------


const TodoApp = () =>
{
    const [todos, setTodos] = useState([]); // State to store the list of todos.

// Fetch todos when the component mounts.
// ----------------------------------------------------------------------------------------------------------------------------
    useEffect(() =>
    {
        const fetchTodos = async () =>
        {
            const token = localStorage.getItem("authToken"); // Retrieve token from local storage.
            try
            {
                const response = await axios.get("http://localhost:8080/api/todos",
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`,   // Include token in request header.
                    },
                });
                setTodos(response.data); // Set fetched todos in state.
            }
            catch (err)
            {
                console.error("Failed to fetch todos", err);  // Log errors.
            }
        };

    fetchTodos(); // Call the function to fetch todos.
    }, []); // Empty dependency array ensures the effect runs once on mount.
// ----------------------------------------------------------------------------------------------------------------------------


// Handle adding a new todo to the list.
// ----------------------------------------------------------------------------------------------------------------------------
    const handleAddTodo = (newTodo) =>
    {
        setTodos((prevTodos) => [...prevTodos, newTodo]); // Add the new todo to the list
    };
// ----------------------------------------------------------------------------------------------------------------------------


// Handle updating an existing todo in the list.
// ----------------------------------------------------------------------------------------------------------------------------
    const handleUpdateTodo = (updatedTodo) =>
    {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === updatedTodo._id ? updatedTodo : todo // Replace updated todo.
          )
        );
    };
// ----------------------------------------------------------------------------------------------------------------------------


// Handle deleting a todo from the list.
// ----------------------------------------------------------------------------------------------------------------------------
    const handleDeleteTodo = (todoId) =>
    {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId)); // Remove the deleted todo
    };
// ----------------------------------------------------------------------------------------------------------------------------


// Render the Todo app with AddTodo and TodoList components.
// ----------------------------------------------------------------------------------------------------------------------------
    return (
    <div>
      <h1>Todo App</h1>
      <AddTodo onAdd={handleAddTodo} />
      <TodoList
        todos={todos}
        onUpdate={handleUpdateTodo}
        onDelete={handleDeleteTodo}
      />
    </div>
    );
// ----------------------------------------------------------------------------------------------------------------------------

};

export default TodoApp; // Exports necessary modules.
