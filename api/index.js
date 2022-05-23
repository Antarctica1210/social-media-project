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

//install multer
const multer = require("multer");

const path = require("path");

//cors
// const cors = require('cors');
// const corsOptions = require('./config/corsOptions');
// app.use(cors(corsOptions));


/*===========================get routes from routes folder==============================*/


//user route
const userRoute = require("./routes/users");
//auth route
const authRoute = require("./routes/auth");
//post route
const postRoute = require("./routes/posts");

const conversationRoute = require("./routes/conversations");

const messageRoute = require("./routes/messages");

/*=========================================================*/


//add environments
dotenv.config();

//mongoose connection
mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log("Connected to MongoDB")
});

//use images path
app.use("/images", express.static(path.join(__dirname, "public/images")));

// middle ware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
        // cb(null, file.originalname);

    },
    
})

const upload = multer({ storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        if(req.file){

            return res.status(200).json("File uploded successfully");
        }else{
            res.status(500).json("file upload failed");
        }
        
    } catch (error) {
        console.error(error);
    }
});

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

app.use("/api/conversations", conversationRoute);

app.use("/api/messages", messageRoute);

/*=========================================================*/


app.listen(8800, ()=>{
    console.log("Backen server is ready! changed")
})