// update post, add post, delete post, get post
const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post
router.post("/", async (req, res) => { 
    //save all the request content into a Post object
    const newPost = new Post(req.body);
    try{
        //save the post to database
        const savedPsot = await newPost.save();
        res.status(200).json(savedPsot);
    }catch(err){
        res.status(500).json(err);
    }
});



//update a post
router.put("/:id", async (req, res) => { 
    try{
        //find the post with the id
        const post = await Post.findById(req.params.id);
        //if the post is ours
        if(post.userId === req.body.userId){
            //update all the contents in the request body
            await post.updateOne({$set:req.body});
            res.status(200).json("Your post has been updated.");
        }else{
            res.status(403).json("You can only update your own id");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//delete a post
router.delete("/:id", async (req, res) => { 
    try{
        //find the post with the id
        const post = await Post.findById(req.params.id);
        //if the post is ours
        if(post.userId === req.body.userId){
            //update all the contents in the request body
            await post.deleteOne();
            res.status(200).json("Your post has been deleted.");
        }else{
            res.status(403).json("You can only delete your own id");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//get a post
router.get("/:id", async (req, res) => { 
    try{
        //get the post by id
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err)
    } 
});


//get the following's and our posts (with timeline)
router.get("/timeline/all", async (req, res) => {
    //create a array post
    
    try{
        //promises used here
        //first get all your posts
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currentUser._id});

        // second get all friends' posts (followings' posts)
        const friendPosts = await Promise.all(
            //map all the followings' id to object friendId and then get all the following's posts
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId});
            })
        );
        //return all the posts
        res.json(userPosts.concat(...friendPosts));

    }catch(err){
        res.status(500).json(err);
    }
});


//like and dislike the post
router.put("/:id/like", async (req, res) => { 
    try{
        //find the post with the id
        const post = await Post.findById(req.params.id);
        //check the like-array include the user or not
        if(!post.likes.includes(req.body.userId)){
            //add the userId (your id) into the likes-array | like post
            await post.updateOne({$push:{likes: req.body.userId}});
            res.status(200).json("post has been liked");
        }else{
            //remove the userId (your id) from the likes-array | dislike post
            await post.updateOne({$pull:{likes: req.body.userId}});
            res.status(200).json("post like has been removed");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;