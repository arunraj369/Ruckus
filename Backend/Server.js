// app.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1/ruckusdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mongoose Schema
const newuserSchema = new mongoose.Schema({
  username:String,
  email: String,
  password: String
});

const User = mongoose.model("User", newuserSchema);


const UsersDataSchema=new mongoose.Schema({
  topologyName:{
      type:String,
      required:true
  },
  appname:{
      type:String,
      required:true
  },
  diagram:{
      type:String,
      required:true
  },
  username:{
    type:String,
    required:true
  },
  checkValue:{
    type:Boolean,
    default:false
  }
})

const UsersDataModal=mongoose.model("userdata",UsersDataSchema)


const DataSchema=new mongoose.Schema({
  topologyName:{
      type:String,
      required:true
  }, 
  appname:{
    type:String,
    required:true
  },
  diagram:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  check:{
    type:Boolean,
    default:false
  }
})

const DataModal=mongoose.model("Datauser",DataSchema);



app.post("/createdata",async(req,res)=>{
  const {topologyName,appname,image,username,check } = req.body;

  try {
    const newUser = new DataModal({ topologyName,appname,diagram:image,username,check });
    await newUser.save();
    res.status(201).json({ message: "Data saved" });
    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error data saved:", error);
    res
      .status(500)
      .json({ message: "Error data saved. Please try again." });
    console.log("Error data saved. Please try again.");
  }
})


app.get("/usersdata", async (req, res) => {
  try {
    const users = await DataModal.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get('/usersdata/:username', async (req, res) => {
  const { username } = req.params;

  try {
      const userData = await DataModal.find({ username });
      res.json(userData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
});


// app.post("/createUsersData" ,async(req,res) =>{
//   const { topology, appName,diagram } = req.body;

//   try {
//     const newUser = new UsersDataModal({ topology, appName,diagram });
//     await newUser.save();
//     res.status(201).json({ message: "UserData updated successfully" });
//     console.log("UserData updated successfully");
//   } catch (error) {
//     console.error("Error in UserData update:", error);
//     res
//       .status(500)
//       .json({ message: "Error in UserData update. Please try again." });
//     console.log("Error in UserData update. Please try again.",error);
//   }
// })


app.delete('/delete', async (req, res) => {
  const index = req.query.index;
  const checked = req.query.checked;
  console.log('checked',checked,index);
});

app.delete("/deleteUser/:id", async (req, res) => {
  const { id } = req.params;

  try {
      const deletedData = await DataModal.findByIdAndDelete(id);
      if (!deletedData) {
          return res.status(404).json({ message: 'Data not found' });
      }
      res.json({ message: 'Data deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
});


app.post("/createUserData",async(req,res)=>{
  const user=req.body;
  console.log(user,'-----------------------------------');
  const newUser=new UsersDataModal(user);
  await newUser.save();
  res.json(user);
})

app.get("/updateUser/:id", async (req, res) => {
  const { id } = req.params;

  try {
      const updateData = await DataModal.find({ _id:id });
      res.json(updateData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
});


// app.post("createUserData/:updateId",async(req,res)=>{
//   const user=req.body;
//   console.log(user,'------------update-----------------------');
//   const newUser=new DataModal(user);
//   await newUser.save();
//   res.json(user);
// })

app.put("/updateUser/:id", async (req, res) => {
  const { id } = req.params;
  const { topologyName, appname, diagram, username } = req.body;

  try {
      const updatedData = await DataModal.findByIdAndUpdate(id, {
          topologyName,
          appname,
          diagram,
          username
      }, { new: true });

      if (!updatedData) {
          return res.status(404).json({ message: 'Data not found' });
      }
      res.json(updatedData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
});


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
  const {username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
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



app.get("/get-image/:id",async(req,res)=>{
  const { id } = req.params;
  try {
      await DataModal.find({ _id:id }).then(data =>{
          res.send({status:"ok",data:data})
      })
  } catch (error) {
      res.send({status:"error",data:error})
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
