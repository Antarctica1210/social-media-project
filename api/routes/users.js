// update user, add users, delete users, get user/users
const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// update user
router.put("/:id", async (req,res) => { 
    if(req.body.userId === req.params.id || req.body.isAdmin){
        // if user update his password
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }

        // update the user
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                // automatically update all the body content
                $set: req.body,
            });
            res.status(200).json("Account update successfully");~``
        } catch (err) {
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can only update your account");
    }
});

// delete user
router.delete("/:id", async (req,res) => {
    //judge if this account is owned by yourself
    if(req.body.userId === req.params.id || req.body.isAdmin){

        // delete the user
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account [" + user.username + "] delete successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can only delete your own account");
    }
});

// get a user
router.get("/", async (req, res) => { 
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId? await User.findById(userId): await User.findOne({ username: username });
        //if find the user then return this
        //not get all the info of the user
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
});

//get friends
router.get("/friends/:userId", async (req,res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId)=>{
                return User.findById(friendId);
            })
        );
        //take part of proporties from user class
        let friendList = [];
        friends.map((friend)=>{
            const {_id, username, profilePicture} = friend;
            friendList.push({_id, username, profilePicture});
        });
        res.status(200).json(friendList);
    } catch (err) {
        console.log(err);
    }
});

//get all users
router.get("/allusers", async (req,res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// follow a user
router.put("/:id/follow", async (req, res) => {
    //judge if user follows himself
    if (req.body.userId !== req.params.id){
        try{
            //the person you want to follow
            const user = await User.findById(req.params.id);
            //yourself (try to make request)
            const currentUser = await User.findById(req.body.userId);
            //you didnot follows the person
            if(!user.followers.includes(req.body.userId)){
                //add you to the person you want to follow
                await user.updateOne({$push:{followers: req.body.userId}});
                //update your following list
                await currentUser.updateOne({$push:{followings: req.params.id}});
                res.status(200).json("User has been followed");
            }else{
                res.status(403).json("You already follow this person");
            }

        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cannot follow yourself!")
    }
});
// unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    //judge if user want to unfollows himself
    if (req.body.userId !== req.params.id){
        try{
            //the person you want to unfollow
            const user = await User.findById(req.params.id);
            //yourself (try to make request)
            const currentUser = await User.findById(req.body.userId);
            //if the person's followers have you
            if(user.followers.includes(req.body.userId)){
                //delete you from person's list
                await user.updateOne({$pull:{followers: req.body.userId}});
                //your following list delete the person
                await currentUser.updateOne({$pull:{followings: req.params.id}});
                res.status(200).json("User has been unfollowed");
            }else{
                res.status(403).json("You did not follow this person");
            }

        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cannot unfollow yourself!")
    }
});

module.exports = router;