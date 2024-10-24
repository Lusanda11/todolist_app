// ****************** Register.js *********************


// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React, { useState } from "react";
    import axios from "axios";
    import { useNavigate } from "react-router-dom";
    import "../styles/Register.css";  // Import the CSS file for styling.
// ----------------------------------------------------------------------------------------------------------------------------


function Register()
{
    const [username, setUsername] = useState(""); // State to hold username.
    const [password, setPassword] = useState(""); // State to hold password.
    const [confirmPassword, setConfirmPassword] = useState(""); // State to hold password confirmation.
    const [error, setError] = useState(null); // State to handle error messages.
    const [success, setSuccess] = useState(null); // State to handle success messages.
    const navigate = useNavigate(); // For navigation after successful registration.

// Handle form submission.
// ----------------------------------------------------------------------------------------------------------------------------
    const handleSubmit = async (e) =>
    {
        e.preventDefault(); // Prevent default form behavior.
        setError(null); // Reset error message.
        setSuccess(null); // Reset success message.

        // Validate password length
        if (password.length < 8)
        {
            setError("Password must be at least 8 characters long.");
            return;
        }


        if (password !== confirmPassword)
        {
            setError("Passwords do not match");  // Validate passwords.
            return;
        }

        try
        {
            // Send POST request to register user.
            const response = await axios.post("http://localhost:8080/user/register", { username, password }); // Full URL

            // If registration is successful, show message and redirect to login page.
            if (response.status === 201)
            {
                setSuccess("Registration successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 1500); // Redirect to login after 1.5s
            }
        }
        catch (err)
        {
            // Improved error feedback from server-side responses
            if (err.response?.data?.message.includes("Forbidden"))
            {
                setError("Only Gmail accounts are allowed.");
            }
            else if (err.response?.data?.message.includes("User already exists"))
            {
                setError("Username already taken.");
            }
            else
            {
                setError(err.response?.data?.message || "Registration failed. Please try again.");
            }
        }
    };
// ----------------------------------------------------------------------------------------------------------------------------


// Render registration form.
// ----------------------------------------------------------------------------------------------------------------------------
    return (
        <div className="register-container">
            <h1 className="neon-text">Register</h1>
            <form className="neon-form" onSubmit={handleSubmit}>
                <input
                    className="neon-input"
                    type="text"
                    placeholder="Username (must be a Gmail account)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    className="neon-input"
                    type="password"
                    placeholder="Password (min 8 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    className="neon-input"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" className="neon-button">Register</button>
            </form>

            {error && <p className="error-message">{error}</p>} {/* Error message */}
            {success && <p className="success-message">{success}</p>} {/* Success message */}
        </div>
    );
// ----------------------------------------------------------------------------------------------------------------------------

}

export default Register; // Export necessary modules.
