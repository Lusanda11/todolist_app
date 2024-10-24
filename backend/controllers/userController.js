// ****************** userController.js *********************



// Import neccessary mdules.
// ----------------------------------------------------------------------------------------------------------------------------
    const jwt = require("jsonwebtoken");
    const bcrypt = require("bcrypt");
    const User = require("../models/user");
// ----------------------------------------------------------------------------------------------------------------------------


// User login controller.
// ----------------------------------------------------------------------------------------------------------------------------
    exports.loginUser = async (req, res) =>
    {
        try
        {
            const { username, password } = req.body;

            // Check if user exists
            const user = await User.findOne({ username });
            if (!user)
            {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            // Check if password is correct
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
            {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            // Send token to client
            res.json({ token, message: "Login successful" });
        }
        catch (error)
        {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    };
// ----------------------------------------------------------------------------------------------------------------------------
