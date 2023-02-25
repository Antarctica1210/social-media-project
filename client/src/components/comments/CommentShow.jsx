import React, { useState, useEffect, useContext } from "react";
import { Comment, Tooltip, Avatar, Modal, message } from "antd";
import moment from "moment";
import {
  getStorage,
  ref,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { DeleteOutlined } from "@material-ui/icons";

//ant design
import "antd/dist/antd.css";
//ant design components
const { confirm } = Modal;

export default function CommentShow({ comment }) {
  const [avatar, setAvatar] = useState("");
  const [userImg, setImg] = useState("");

  // Create a reference to the file we want to download
  const storage = getStorage();

  //use user from context
  const { user: currentUser } = useContext(AuthContext);

  //handle with userId
  const userId = comment.userId.split("@")[0];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${userId}`);
        console.log(res.data.profilePicture);
        setImg(res.data.profilePicture);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  });

  const delComment = async (e) => {
    e.preventDefault();
    confirm({
      title: "Are you sure to delete this comment?",
      content:
        "You are going to delete comment of " + comment.userName + "'s post.",
      async onOk() {
        try {
          const res = await axios.delete(
            "/posts/delcomment/" + comment.postId + "$" + comment.userId
          );
          console.log(res);
          message.success(res);
          window.location.reload();
        } catch (error) {
          message.success("Delete comment failed");
        }
      },
      onCancel() {
        message.success("Cancel deleting the comment");
      },
    });
    // console.log("delete: " + comment.userId + " postId: " + comment.postId);
  };

  useEffect(() => {
    if (userImg) {
      // Create a reference to the file we want to download

      getDownloadURL(ref(storage, "public/images/" + userImg)).then((url) => {
        // Insert url into an <img> tag to "download"
        setAvatar(url);
      });
    }
  }, [userImg, storage]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Comment
        // actions={actions}

        author={<span>{comment.userName}</span>}
        avatar={<Avatar src={avatar} alt="Han Solo" />}
        content={<p style={{ fontSize: "18px" }}>{comment.comment}</p>}
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
      <div className="deleteComment">
        {/* show delete or not by judging post id and user id */}
        {currentUser._id === userId ? (
          <DeleteOutlined onClick={delComment} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
