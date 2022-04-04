//connect to database and initialise the user objects
const mongoose = require("mongoose");

//objects used to accept the json files and pack them into objects
const PostSchema = new mongoose.Schema({
    
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String,
    },
    likes:{
        type:Array,
        default:[]
    },
},
// each time add/updata/delete post get a time stamp
{timestamps:true}
);

// exports
module.exports = mongoose.model("Post", PostSchema);

