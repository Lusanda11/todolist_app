// ****************** AddTodo.js *********************


// Import React, hooks, Axios, and CSS.
// ----------------------------------------------------------------------------------------------------------------------------
    import React, { useState } from "react";
    import axios from "axios";
    import "../styles/AddTodo.css";
// ----------------------------------------------------------------------------------------------------------------------------


const AddTodo = ({ onAdd }) =>
{
// Initialize task and error state, onAdd is passed as a prop.
// ----------------------------------------------------------------------------------------------------------------------------
    const [task, setTask] = useState("");
    const [error, setError] = useState(null);
// ----------------------------------------------------------------------------------------------------------------------------


// Handle form submission, prevent default behavior, and reset error.
// ----------------------------------------------------------------------------------------------------------------------------
    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setError(null);

        if (!task.trim())
        {
            setError("Task can't be empty");
            return;
        }

        try
        {
            // Send a POST request with the task and JWT token from localStorage.
            const token = localStorage.getItem("authToken"); // Get the token from localStorage
            const response = await axios.post("http://localhost:8080/api/todos", { task },
            {
                headers:
                {
                    Authorization: `Bearer ${token}`, // Set the token in the Authorization header
                },
            });

            if (response.status === 201)
            {
                onAdd(response.data); // Pass the new todo to the parent component
                setTask(""); // Reset task input
            }
        }
        catch (err)
        {
            // Handle errors: check for invalid/expired token and redirect, handle other errors.
            const response = err.response;

            // Check for invalid or expired token
            if (response && (response.status === 403 || response.data.message === "Invalid token"))
            {
                localStorage.removeItem("authToken"); // Remove token from localStorage
                // Redirect to login page
                window.location.href = "/login";
            }
            else
            {
                setError("Failed to add todo"); // Handle other errors
            }
        }
// ----------------------------------------------------------------------------------------------------------------------------

    };

// Render form, task input, button, and display errors if any.
// ----------------------------------------------------------------------------------------------------------------------------
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter a new task"
                />
                <button type="submit">Add Todo</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
// ----------------------------------------------------------------------------------------------------------------------------

};

export default AddTodo; // Export necessary modules.
