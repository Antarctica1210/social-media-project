import React, { useEffect, useContext } from 'react'
import "./post.css"
import { MoreVert } from '@material-ui/icons'
// import { Users} from "../../dummyData"
import { useState } from 'react'
import axios from "axios";
//import timeago
import {format} from "timeago.js";
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';



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

    return (
        <div className='post'>
            <div className="postWrapper">
                {/* top of each post */}
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img className='postProfileImg' src={user.profilePicture? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                {/* main content */}
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className='postImg' src={PF + post.img} alt="" />
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
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
