// Assuming you have already set up your Express app and connected to MongoDB

const express = require("express");
const router = express.Router(); // Create a router instance

const User = require("../models/User"); // Assuming you have a User model defined

// Route to fetch all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
