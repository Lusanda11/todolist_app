// ****************** App.js *********************


// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React, { useEffect, useState } from "react";
    import { Route, Routes, Navigate, useLocation } from "react-router-dom";
    import Login from "./components/Login";
    import Register from "./components/Register";
    import Header from "./components/Header";  // Assuming a header component for navigation
    import TodoApp from "./components/TodoApp"; // Importing TodoApp
// ----------------------------------------------------------------------------------------------------------------------------

// App component handles routing and authentication.
const App = () =>
{
    const location = useLocation(); // Get current route location.
    const isAuthPage = location.pathname === "/register" || location.pathname === "/login"; // Check if current route is an auth page.

    const [authToken, setAuthToken] = useState(null);// State to store the auth token.
    const [loading, setLoading] = useState(true); // State to show loading while checking auth.

// Check local storage for auth token on component mount.
// ----------------------------------------------------------------------------------------------------------------------------
    useEffect(() =>
    {
        const token = localStorage.getItem("authToken"); // Retrieve token from localStorage.
        if (token)
        {
            setAuthToken(token); // Set authToken if found.
        }
        setLoading(false); // Set loading to false after checking for token
    }, []);
// ----------------------------------------------------------------------------------------------------------------------------


// If loading, display a loading message while checking for token.
// ----------------------------------------------------------------------------------------------------------------------------
    if (loading)
    {
        return <div>Loading...</div>; // Display loading state while checking auth
    }
// ----------------------------------------------------------------------------------------------------------------------------


// Main return block for rendering the component.
// ----------------------------------------------------------------------------------------------------------------------------
    return (
        <div className="App">
          {!isAuthPage && <Header />}

          <Routes>
            {/* Public Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setAuthToken={setAuthToken} />} /> {/* Pass setAuthToken */}

            {/* Protected Routes */}
            <Route
              path="/todos"
              element={authToken ? <TodoApp /> : <Navigate to="/login" />}
            />

            {/* Default Route */}
            <Route path="*" element={<Navigate to={authToken ? "/todos" : "/login"} />} />
          </Routes>
        </div>
    );
// ----------------------------------------------------------------------------------------------------------------------------

};

export default App; // Export necessary modules.
