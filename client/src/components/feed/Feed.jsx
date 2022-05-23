import "./feed.css"
import Share from "../share/Share"
import Post from "../post/Post"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

// get sample data
// import {Posts} from "../../dummyData"

export default function Feed({username, avatar}) {

    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);


    useEffect(() => {
        
        const fetchPosts = async () => {
            const res = username? await axios.get("/posts/profile/" + username) : await axios.get("posts/timeline/" + user._id);
            setPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
            
            // console.log(res);
            // setPosts(res.data);
        };
        fetchPosts();
    }, [username, user._id]);

    return (
        <div className="feed">

            <div className="feedWrapper">
                {/* list all the post, if not our page, remove the share block */}
                
                {(!username || username === user.username) && <Share avatar={avatar}/>}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}

            </div>
        </div>
    )
}
