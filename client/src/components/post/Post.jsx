import React, { useEffect, useContext } from 'react'
import "./post.css"
import { DeleteOutlined } from '@material-ui/icons'
// import { Users} from "../../dummyData"
import { useState } from 'react'
import axios from "axios";
//import timeago
import {format} from "timeago.js";
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
//ant design
import { Modal, message, Image, Button } from "antd";
import "antd/dist/antd.css";
//firebase
import { getStorage, ref, getDownloadURL,  deleteObject } from "firebase/storage";
//comments components
import Comments from "../comments/Comments";

//ant design components
const {confirm} = Modal;






export default function Post({post}) {
    //set the initial like number
    const [like, setLike] = useState(post.likes.length)
    //default isliked is false
    const [isLiked, setIsLiked] = useState(false)
    //set user
    const [user, setUser] = useState({});
    //environment variable PF = public folder
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    //use user from context
    const {user:currentUser} = useContext(AuthContext);
    //post photo
    const [photo, setPhoto] = useState("");

    

    //judge the post like/dislike status
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    //fetch posts
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);

    //get photo
    useEffect(()=>{
        if (post.img){

            // Create a reference to the file we want to download
            const storage = getStorage();
            const starsRef = ref(storage, 'public/images/' + post.img);
            getDownloadURL(starsRef)
                .then((url) => {
                    // Insert url into an <img> tag to "download"
                    setPhoto(url);
                })
        }
    }, [post.img]);

    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", {userId:currentUser._id})
        } catch (err) {
            
        }
        //if is false (you didnot click the like button) 
        setLike(isLiked? like-1 : like+1)
        //set is liked otherwise the number always add
        setIsLiked(!isLiked)
    }

    const delPost =  () =>{
        confirm({
            title:"Are you sure to delete this post?",
            content:"This post will be delete",
            async onOk(){
                try {
                    

                    const res = await axios.delete("/posts/" + post._id, {data:{userId:currentUser._id}});

                    const storage = getStorage();
                    // Create a reference to the file to delete
                    const desertRef = ref(storage, 'public/images/' + post.img);
                    console.log(post.img);
                    //if has post.img delete img, if no img, just reload window
                    if(post.img){

                        // Delete the file
                        deleteObject(desertRef).then(() => {
                            // File deleted successfully
                            window.location.reload();
                            message.success(res.data);
                        }).catch((error) => {
                            // Uh-oh, an error occurred!
                            message.success("delete photo fail");
                        });
                    }else{
                        // File deleted successfully
                        window.location.reload();
                        // console.log(res.data);
                        message.success(res.data);
                    }
                } catch (error) {
                    message.success("delete fail");
                }
            },
            onCancel(){
                message.success("You cancal your delete")
            }
        });
    }

    //set profimg and coverimg
    
    const [avatar, setAvatar] = useState("");

    // Create a reference to the file we want to download
    const storage = getStorage();

    //avatar
    useEffect(()=>{
        if (user.profilePicture){

            // Create a reference to the file we want to download
            
            const starsRef = ref(storage, 'public/images/' + user.profilePicture);
            getDownloadURL(starsRef)
                .then((url) => {
                    // Insert url into an <img> tag to "download"
                    setAvatar(url);
                })
        }
    }, [user.profilePicture, storage]);


    return (
        <div className='post'>
            <div className="postWrapper">
                {/* top of each post */}
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img className='postProfileImg' src={user.profilePicture? avatar : PF + "person/noAvatar.png"} alt="" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        {/* show delete or not by judging post id and user id */}
                        {(currentUser._id === post.userId)? <DeleteOutlined onClick={delPost}/> : ""}
                        
                    </div>
                </div>
                {/* main content */}
                <div className="postCenter">
                    <div className="postText">{post?.desc}</div>
                    
                    {post.img?<Image className='postImg' src={photo} alt="" />: ""}
                    {/* <Image
                        
                        preview={{
                        visible,
                        src: photo,
                        onVisibleChange: value => {
                            setVisible(value);
                        },
                        }}
                    /> */}
                </div>
                {/* bottom part */}
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className='likeIcon' src={`${PF}like.png`} onClick={likeHandler} alt="" />
                        <img className='likeIcon' src={`${PF}heart.png`} onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    {/* comments */}
                    <div className="postBottomRight">
                        {/* <span className="postCommentText" > comments</span> */}
                        {/* <Button type="primary" onClick={() => setVisible(true)} ghost>
                            preview
                        </Button> */}
                    </div>
                </div>
                <div className='bottomEnd'>

                    <Comments post={post} />
                </div>
                    
                    
                    
            </div>
            
        </div>
    )
}
