// update post, add post, delete post, get post
const router = require("express").Router();
const Post = require("../models/Post");

router.get("/", (req, res) => { 
    res.json("Post page");
});

//create a post


//update a post


//delete a post


//get a post


//get the following's and our posts (with timeline)


//like the post



module.exports = router;