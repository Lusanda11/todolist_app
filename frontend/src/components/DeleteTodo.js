// ****************** DeleteTodo.js *********************


// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React from "react";
    import axios from "axios";
    import "../styles/TodoStyles.css";
// ----------------------------------------------------------------------------------------------------------------------------


// DeleteTodo is a functional component that handles deleting a task.
// ----------------------------------------------------------------------------------------------------------------------------
    const DeleteTodo = ({ todoId, onDelete }) =>
    {
        // Function to handle deleting a todo by ID.
        const handleDelete = async () =>
        {
            try
            {
                const token = localStorage.getItem("authToken"); // Get the token from localStorage.
                // Send a DELETE request to the server to delete the todo.
                const response = await axios.delete(`http://localhost:8080/api/todos/${todoId}`,
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`,       // Set token in the Authorization header
                    },
                });

                // If delete is successful, call onDelete to update parent component.
                if (response.status === 200)
                {
                    onDelete(todoId);
                }
            }
            catch (err)
            {
                const response = err.response

                // Error handling: Check if the token is invalid or expired, redirect to login.
                if (response && (response.status === 403 || response.data.message === "Invalid token"))
                {
                    localStorage.removeItem("authToken"); // Remove token from localStorage.
                    window.location.href = "/login"; // Redirect to login page.
                }
                else
                {
                    console.error("Failed to delete todo"); // Handle other errors.
                }
            }
      };

        // Render a delete button that triggers the handleDelete function.
        return (
            <button className="todo-button" onClick={handleDelete}>
                Delete
            </button>
        );
    };
// ----------------------------------------------------------------------------------------------------------------------------


export default DeleteTodo; // Export necessary modules.
