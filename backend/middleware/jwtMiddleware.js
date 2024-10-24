// ****************** jwtMiddleware.js *********************


const jwt = require("jsonwebtoken"); // Import neccessary modules.

const jwtMiddleware = (req, res, next) =>
{
    const authHeader = req.headers["authorization"];

// Check if the Authorization header is missing.
// ----------------------------------------------------------------------------------------------------------------------------
    if (!authHeader)
    {
        console.log("Authorization header is missing");
        return res.status(401).json({ message: "Authorization header is missing" });
    }
// ----------------------------------------------------------------------------------------------------------------------------

// Ensure it starts with "Bearer " and split the token.
// ----------------------------------------------------------------------------------------------------------------------------
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer")
    {
        console.log("Malformed Authorization header");
        return res.status(401).json({ message: "Malformed Authorization header" });
    }

    const token = parts[1];

    if (!token)
    {
        console.log("Token missing from Authorization header");
        return res.status(401).json({ message: "Token missing from Authorization header" });
    }
// ----------------------------------------------------------------------------------------------------------------------------

// Verify the JWT token.
// ----------------------------------------------------------------------------------------------------------------------------
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) =>
    {
        if (err)
        {
            console.log("Token verification failed:", err.message);
            return res.status(403).json({ message: "Invalid token" });
        }

        // Attach the payload to the request object
        req.payload = payload;
        console.log("Token verified successfully");

        next(); // Proceed to the next middleware or route handler
    });
// ----------------------------------------------------------------------------------------------------------------------------

};

module.exports = jwtMiddleware; // Export neccessary modules.
