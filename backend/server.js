// ****************** server.js *********************


// Import neccessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    const express = require("express");
    const dotenv = require("dotenv");
    const mongoose = require("mongoose");
    const cors = require("cors"); // Added CORS middleware
    const userRoutes = require("./routes/userRoute");
    const todoRoutes = require("./routes/todoRoute");
// ----------------------------------------------------------------------------------------------------------------------------


    // Load environment variables from .env file
    dotenv.config();

    // Initialize Express app
    const app = express();

    // Port from environment variables or default to 8080
    const PORT = process.env.PORT || 8080;

    // MongoDB connection string from environment variables
    const MONGO_URI = process.env.MONGO_URI;

    // Middleware to parse JSON
    app.use(express.json());

    // Enable CORS for all routes
    app.use(cors());
    

// Connect to MongoDB
// ----------------------------------------------------------------------------------------------------------------------------
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) =>
    {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit the application if MongoDB connection fails
    });
// ----------------------------------------------------------------------------------------------------------------------------


// Apply routes.
// ----------------------------------------------------------------------------------------------------------------------------
    app.use("/user", userRoutes); // User routes (register, login)
    app.use("/api", todoRoutes);  // To-do routes
// ----------------------------------------------------------------------------------------------------------------------------


// Example route to test if the server is running.
// ----------------------------------------------------------------------------------------------------------------------------
    app.get("/", (req, res) =>
    {
        res.send("Server is running");
    });
// ----------------------------------------------------------------------------------------------------------------------------


// Start the server.
// ----------------------------------------------------------------------------------------------------------------------------
    app.listen(PORT, () =>
    {
        console.log(`Server running on port ${PORT}`);
    });
// ----------------------------------------------------------------------------------------------------------------------------
