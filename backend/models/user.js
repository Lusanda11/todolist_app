// ****************** user.js *********************


const mongoose = require("mongoose"); // Import neccessary modules.

//The userSchema defines the structure of user documents in the MongoDB collection.
// ----------------------------------------------------------------------------------------------------------------------------
    const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        tasks: [{ type: String }]
    });
// ----------------------------------------------------------------------------------------------------------------------------

module.exports = mongoose.model("User", userSchema); // Export neccessary modules.
