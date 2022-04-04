//initialise app with express
const express = require("express");
const app = express();

// initialise mongoose
const mongoose = require("mongoose");

// initialise dotenv
const dotenv = require("dotenv");

// initialise helmet
const helmet = require("helmet");

// initialise morgan
const morgan = require("morgan");

/*===========================get routes from routes folder==============================*/


//user route
const userRoute = require("./routes/users");
//auth route
const authRoute = require("./routes/auth");
//post route
const postRoute = require("./routes/posts");

/*=========================================================*/


//add environments
dotenv.config();

//mongoose connection
mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log("Connected to MongoDB")
});

// middle ware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

/*===========================route display on browser==============================*/

//route to user api
app.use("/api/users", userRoute);

// route to auth api
app.use("/api/auth", authRoute); 

//route to post api
app.use("/api/posts", postRoute);

app.get("/",(req, res)=>{
    res.send("Welcome to homepage!")
})

app.get("/users",(req, res)=>{
    res.send("Welcome to user!")
})

/*=========================================================*/


app.listen(8800, ()=>{
    console.log("Backen server is ready! changed")
})