// ****************** userRoute.js *********************


// Import neccessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    const express = require("express");
    const bcrypt = require("bcrypt");
    const jwt = require("jsonwebtoken");
    const User = require("../models/user"); // Assume you have a User model
    const { gmailCheck } = require("../middleware/customMiddleware"); // Import gmailCheck middleware
    const router = express.Router();
// ----------------------------------------------------------------------------------------------------------------------------


// Register a new user.
// ----------------------------------------------------------------------------------------------------------------------------
    router.post("/register", gmailCheck, async (req, res) =>  // Apply gmailCheck middleware
    {
        const { username, password } = req.body;
        if (!username || !password)
        {
            return res.status(400).json({ message: "Username and password are required" });
        }

        try
        {
            // Check if user already exists
            const existingUser = await User.findOne({ username });
            if (existingUser)
            {
                return res.status(409).json({ message: "User already exists" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();

            return res.status(201).json({ message: "User registered successfully" });
        }
        catch (error)
        {
            return res.status(500).json({ message: "Error registering user" });
        }
    });
// ----------------------------------------------------------------------------------------------------------------------------


// Login user and return a JWT.
// ----------------------------------------------------------------------------------------------------------------------------
    router.post("/login", async (req, res) =>
    {
        const { username, password } = req.body;
        if (!username || !password)
        {
            return res.status(400).json({ message: "Username and password are required" });
        }

        try
        {
            const user = await User.findOne({ username });
            if (!user)
            {
                return res.status(404).json({ message: "User not found" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid)
            {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // Create a JWT token
            const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            });

            return res.status(200).json({ message: "Login successful", token });
        }
        catch (error)
        {
            return res.status(500).json({ message: "Error logging in user" });
        }
    });
// ----------------------------------------------------------------------------------------------------------------------------


module.exports = router; // Export neccessary modules.
