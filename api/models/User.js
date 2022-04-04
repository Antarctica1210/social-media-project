//connect to database and initialise the user objects
const mongoose = require("mongoose");

//objects used to accept the json files and pack them into objects
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        min:3,
        max:20,
        unique:true,
    },
    email:{
        type:String,
        required: true,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
    profilePicture:{
        type:String,
        default:"",
    },
    coverPicture:{
        type:String,
        default:"",
    },
    followers:{
        type:Array,
        default:[],
    },
    followings:{
        type:Array,
        default:[],
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:Number,
        enum:[1, 2, 3]
    }

},
// each time add/updata/delete user get a time stamp
{timestamps:true}
);

// exports
module.exports = mongoose.model("User", UserSchema);

