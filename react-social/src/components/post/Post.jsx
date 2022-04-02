import React from 'react'
import "./post.css"
import { MoreVert } from '@material-ui/icons'
import { Users} from "../../dummyData"
import { useState } from 'react'

export default function Post({post}) {
    //set the initial like number
    const [like, setLike] = useState(post.like)
    //default isliked is false
    const [isLiked, setIsLiked] = useState(false)

    const likeHandler = () => {
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
                        <img className='postProfileImg' src={Users.filter(u => u.id === post.userId)[0].profilePicture} alt="" />
                        <span className="postUsername">{Users.filter(u => u.id === post.userId)[0].username}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                {/* main content */}
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className='postImg' src={post.photo} alt="" />
                </div>
                {/* bottom part */}
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className='likeIcon' src="assets/like.png" onClick={likeHandler} alt="" />
                        <img className='likeIcon' src="assets/heart.png" onClick={likeHandler} alt="" />
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
