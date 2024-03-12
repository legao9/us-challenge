const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
// const errorHandler = require('./middlewares/error');
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const challengeRoutes = require("./routes/challengeRoute")
const pollRoutes = require("./routes/pollRoutes")
const stripePaymentRoutes = require('./routes/stripePayment')
const path = require("path");
const challenge = require("./models/challenges");
const cors = require("cors");
const todoListRoute = require("./routes/todoListRoute")
const userRoute = require("./routes/userRoutes")

// const Challenge = mongoose.model('Student', challengeSchema);

connectDB();

const app = express();
const port = 8000;
app.use(bodyParser.json());

app.use(cors());
app.use("/auth", authRoutes);
app.use("/challenge", challengeRoutes)
app.use('/polls', pollRoutes)
app.use("/api/stripe",stripePaymentRoutes)
app.use("/todolist",todoListRoute)//
app.use("/user",userRoute)//
//app.use(
  ///cors({
    //origin: '*',
   // credentials: true,
   // methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
   // allowedHeaders: ['Content-Type'],
    //exposedHeaders: ['Content-Type']
//})/
//);
//app.use(cors());
app.get("/test",(req, res)=>{
  res.send("working well")
})

app.get("/", async (req, res) => {
  try {
    // Fetch all challenges from the database
    const challenges = await challenge.find();

    // Log the challenges to the console

    // Send the challenges as the response
    res.json(challenges);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/", (req, res) => {
  const receivedData = req.body; // Assuming the JSON data is in the request body
  const chlng = new challenge(receivedData);

  chlng.save().then(
    (response) => {console.log("One entry added")
    res.json({
      message: "Data received successfully",
      status:200,
      data: response,
    });
  },
    (err) => console.log(err)
    );

  // Do something with the received data (e.g., store it in a database)
  // Here, we'll simply send back a response with the received data and a success message

});


app.get('/testServer',(req,res)=>{
res.json({msg:'workinmg'})
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
