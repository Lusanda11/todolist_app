// ****************** index.js *********************

// Import neccessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    // import "bootstrap/dist/css/bootstrap.min.css";
    import React from "react";
    import ReactDOM from "react-dom/client";  // Import the new ReactDOM
    import { Provider } from "react-redux";
    import store from "./redux/store";
    import App from "./App";
    import { BrowserRouter } from "react-router-dom";
    import "./index.css";
    // import { CarProvider } from './context/CarContext';
// ----------------------------------------------------------------------------------------------------------------------------


// root Initialization: Uses ReactDOM.createRoot to initialize the root of the React app.
// ----------------------------------------------------------------------------------------------------------------------------
    const root = ReactDOM.createRoot(document.getElementById("root"));  // Create root
    root.render(
        <Provider store={store}>
            <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </React.StrictMode>
        </Provider>
    );
// ----------------------------------------------------------------------------------------------------------------------------
