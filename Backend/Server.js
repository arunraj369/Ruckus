// app.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ruckusdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mongoose Schema
const newuserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", newuserSchema);

// API Endpoint for User Signup
// Login function
app.get("/logUser", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Signup function
app.post("/User", async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
    console.log("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "Error registering user. Please try again." });
    console.log("Error registering user. Please try again.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
