// ****************** Header.js *********************


// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React from "react";
    import { Link } from "react-router-dom";
    import { useSelector, useDispatch } from "react-redux";
    import "../styles/Header.css"; // Import your custom CSS for additional styling
    import { logoutUser } from "../redux/actions"; // Import the logout action
// ----------------------------------------------------------------------------------------------------------------------------


const Header = () =>
{

// Accessing the Redux state.
// ----------------------------------------------------------------------------------------------------------------------------
    const username = useSelector((state) => state.user.user?.username); // Check if the username exists
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Check if user is authenticated
    const dispatch = useDispatch();
// ----------------------------------------------------------------------------------------------------------------------------



// Handle user logout and clear localStorage.
// ----------------------------------------------------------------------------------------------------------------------------
    const handleLogout = () =>
    {
        dispatch(logoutUser()); // Call the logout action
        localStorage.removeItem("authToken"); // Clear token from localStorage
    };
// ----------------------------------------------------------------------------------------------------------------------------


// Render necessary elements and components.
// ----------------------------------------------------------------------------------------------------------------------------
    return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            My App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link">Welcome, {username}!</span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
    );
// ----------------------------------------------------------------------------------------------------------------------------

};

export default Header; // Export necessary modules.
