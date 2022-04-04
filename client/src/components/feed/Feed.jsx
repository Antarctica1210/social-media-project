import "./feed.css"
import Share from "../share/Share"
import Post from "../post/Post"
// get sample data
import {Posts} from "../../dummyData"

export default function Feed() {
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                {/* list all the post */}
                {Posts.map((post) => (
                    <Post key={post.id} post={post}/>
                ))}

            </div>
        </div>
    )
}
