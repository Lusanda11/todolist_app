// ****************** Login.js *********************


// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React, { useState } from "react";
    import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection.
    import "../styles/Login.css"; // Assuming you have a CSS file for styling.
// ----------------------------------------------------------------------------------------------------------------------------

// Login component that handles user authentication.
const Login = ({ setAuthToken }) =>
{
    const [credentials, setCredentials] = useState({ username: "", password: "" }); // Receive setAuthToken as a prop.
    const navigate = useNavigate(); // Initialize navigate.

// Function to handle form submission.
// ----------------------------------------------------------------------------------------------------------------------------
    const handleSubmit = async (e) =>
    {
        e.preventDefault(); // Prevent form default submission.

        const response = await fetch("/user/login",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",   // Set request headers to JSON.
            },
            body: JSON.stringify(credentials),   // Send user credentials.
        });

        const data = await response.json();

        // If token is received, store in localStorage and update parent component.
        if (data.token)
        {
            localStorage.setItem("authToken", data.token); // Store the token
            setAuthToken(data.token); // Update authToken in App.js
            console.log("Login successful");
            navigate("/todos"); // Redirect to Todo List page
        }
        else
        {
            console.error("Login failed:", data.message);
        }
    };
// ----------------------------------------------------------------------------------------------------------------------------


// Render the login form.
// ----------------------------------------------------------------------------------------------------------------------------
    return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="input-field"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      
      {/* Link to home */}
      <p className="home-link">
          Already have an account? <Link to="/home">Go to Home</Link>
      </p>

      <p className="register-link">
        Don't have an account? <Link to="/register">Register Here</Link>
      </p>
    </div>
    );
// ----------------------------------------------------------------------------------------------------------------------------

};

export default Login; // Export necessary modules.
