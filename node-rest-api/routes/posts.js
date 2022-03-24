// update post, add post, delete post, get post
const router = require("express").Router();
const Post = require("../models/Post");

router.get("/", (req, res) => { 
    res.json("Post page");
});

module.exports = router;