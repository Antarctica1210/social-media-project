import React, { useState, useEffect, useRef, useContext } from "react";
import { Input, Button } from "antd";
import { AuthContext } from "../../context/AuthContext";

import CommentShow from "./CommentShow";
import axios from "axios";

// import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

export default function Comments({ post }) {
  // const [likes, setLikes] = useState(0);
  // const [dislikes, setDislikes] = useState(0);
  // const [action, setAction] = useState(null);

  // const like = () => {
  //     setLikes(1);
  //     setDislikes(0);
  //     setAction('liked');
  // };

  // const dislike = () => {
  //     setLikes(0);
  //     setDislikes(1);
  //     setAction('disliked');
  // };

  // const actions = [
  //     <Tooltip key="comment-basic-like" title="Like">
  //         <span onClick={like}>
  //             {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
  //             <span className="comment-action">{likes}</span>
  //         </span>
  //     </Tooltip>,
  //     <Tooltip key="comment-basic-dislike" title="Dislike">
  //         <span onClick={dislike}>
  //             {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
  //             <span className="comment-action">{dislikes}</span>
  //         </span>
  //     </Tooltip>,
  //     <span key="comment-basic-reply-to">Reply to</span>,
  // ];

  //context
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const comment = useRef(null);

  const addComment = async (e) => {
    e.preventDefault();
    console.log(comment.current.input.value);
    const newComment = {
      comments: {
        postId: post._id,
        userId: currentUser._id + "@" + new Date().getTime(),
        userName: currentUser.username,
        comment: comment.current.input.value,
      },
    };
    try {
      const res = await axios.put("/posts/comment/" + post._id, newComment);
      console.log(res);
      window.location.reload();
    } catch (error) {}
  };

  return (
    <div className="comment-wrapper">
      <div className="comment-block">
        {post.comments.map((comment) => (
          <CommentShow key={comment.userId} comment={comment} />
        ))}
      </div>
      <div className="add-comment-block" style={{ marginTop: "10px" }}>
        <Input.Group compact>
          <Input
            style={{ width: "calc(100% - 80px)" }}
            placeholder="Comment"
            ref={comment}
          />
          <Button type="primary" onClick={addComment} ghost>
            Submit
          </Button>
        </Input.Group>
      </div>
    </div>
  );
}
