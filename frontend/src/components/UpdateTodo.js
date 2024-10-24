// ****************** UpdateTodo.js *********************


// Import necessary modules and styles.
// ----------------------------------------------------------------------------------------------------------------------------
    import React, { useState } from "react";
    import axios from "axios";
    import "../styles/TodoStyles.css";
// ----------------------------------------------------------------------------------------------------------------------------

// UpdateTodo component allows updating an existing todo task.
const UpdateTodo = ({ todoId, currentTask, onUpdate }) =>
{
    const [task, setTask] = useState(currentTask); // Initialize task state with current task.
    const [error, setError] = useState(null); // Initialize error state.

// Handle task update request.
// ----------------------------------------------------------------------------------------------------------------------------
    const handleUpdate = async (e) =>
    {
        e.preventDefault();
        setError(null); // Reset error state.

        if (!task.trim())
        {
            // Check for empty task.
            setError("Task can't be empty");
            return;
        }

        try
        {
            const token = localStorage.getItem("authToken"); // Retrieve auth token from local storage.
            const response = await axios.put(   // Send PUT request to update the task.
                `http://localhost:8080/api/todos/${todoId}`,
                { task },
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`,   // Set Authorization header.
                    },
                }
            );

            if (response.status === 200)
            {
                // Update successful.
                onUpdate(response.data); // Update todo in parent component.
            }
        }
        catch (err)
        {
            // Handle errors.
            const response = err.response;

            if (response && (response.status === 403 || response.data.message === "Invalid token"))
            {
                localStorage.removeItem("authToken"); // Clear token if invalid.
                window.location.href = "/login"; // Redirect to login.
            }
            else
            {
                setError("Failed to update todo");  // Set error message.
            }
        }
    };
// ----------------------------------------------------------------------------------------------------------------------------


// Form to input the updated task.
// ----------------------------------------------------------------------------------------------------------------------------
    return (
      <form className="todo-form" onSubmit={handleUpdate}>
        <input
          type="text"
          className="todo-input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Update task"
        />
        <button className="todo-button" type="submit">
          Update Todo
        </button>
        {error && <p className="todo-error">{error}</p>} {/* Display error message if any */}
      </form>
    );
// ----------------------------------------------------------------------------------------------------------------------------

};

export default UpdateTodo; // Export necessary modules.
