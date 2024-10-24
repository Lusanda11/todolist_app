// ****************** customMiddleware.js *********************



// Middleware to check if username ends with "@gmail.com".
// ----------------------------------------------------------------------------------------------------------------------------
    const gmailCheck = (req, res, next) =>
    {
        const { username } = req.body;

        if (!username)
        {
            console.log("Username is missing");
            return res.status(400).json({ message: "Username is required" });
        }

        if (username.endsWith("@gmail.com"))
        {
            next(); // Proceed if username is valid
        }
        else
        {
            console.log("Forbidden: Username must end with @gmail.com");
            res.status(403).json({ message: "Forbidden: Username must end with @gmail.com" });
        }
    };
// ----------------------------------------------------------------------------------------------------------------------------

// Middleware to check if the task exceeds 140 characters.
// ----------------------------------------------------------------------------------------------------------------------------
    const taskLengthCheck = (req, res, next) =>
    {
        const { task } = req.body;

        if (!task)
        {
            console.log("Task is missing");
            return res.status(400).json({ message: "Task is required" });
        }

        if (task.length > 140)
        {
            console.log("Task exceeds 140 characters");
            return res.status(400).json({ message: "Task exceeds 140 characters" });
        }
        else
        {
            next(); // Proceed if the task length is valid
        }
    };
// ----------------------------------------------------------------------------------------------------------------------------

// Middleware to check if the content type is JSON.
// ----------------------------------------------------------------------------------------------------------------------------
    const jsonContentCheck = (req, res, next) =>
    {
        if (req.is("application/json"))
        {
            next(); // Proceed if content type is JSON
        }
        else
        {
            console.log("Unsupported content type");
            res.status(415).json({ message: "Unsupported content type. Expected application/json." });
        }
    };
// ----------------------------------------------------------------------------------------------------------------------------


module.exports = { gmailCheck, taskLengthCheck, jsonContentCheck }; // Export neccessary modules.
