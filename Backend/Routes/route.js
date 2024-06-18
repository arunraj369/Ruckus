// // Assuming you have already set up your Express app and connected to MongoDB

// const express = require("express");
// const router = express.Router(); // Create a router instance

// const User = require("../models/User"); // Assuming you have a User model defined

// // Route to fetch all users
// router.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router(); // Create a router instance

const UserData = require("../Modal/UserData"); // Assuming you have a User model defined

// Route to fetch all users
router.get("/usersdata", async (req, res) => {
  try {
    const users = await UserData.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/createUsersData" ,async(req,res) =>{
  const { topologyName, appname,diagram } = req.body;

  try {
    const newUser = new UserData({ topologyName, appname,diagram });
    await newUser.save();
    res.status(201).json({ message: "UserData updated successfully" });
    console.log("UserData updated successfully");
  } catch (error) {
    console.error("Error in UserData update:", error);
    res
      .status(500)
      .json({ message: "Error in UserData update. Please try again." });
    console.log("Error in UserData update. Please try again.");
  }
})
module.exports = router;