// users authorithentic
const router = require("express").Router();
// user user model
const User = require("../models/User");
// use bcrypt
const bcrypt = require("bcrypt");

// register
router.post("/register", async (req,res)=>{
    
    
    try{
        // crypt the password before save to database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // save user
        const user= await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

// login
router.post("/login", async (req,res) =>{
    try{
        // check in the database if exist a user with this email
        const user = await User.findOne({email: req.body.email});
        // work as if statement, if first = true(user is not found, user is undefined now), return the later results(404)
        !user && res.status(404).json("user not found");

        // check password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        // if password is different return 404
        !validPassword && res.status(404).json("wrong password");

        // correct situation
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;