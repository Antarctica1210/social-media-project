import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
//firebase
import { ref,  getStorage, getDownloadURL } from "firebase/storage";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  //set profimg and coverimg
    
  const [avatar, setAvatar] = useState("");

  // Create a reference to the file we want to download
  const storage = getStorage();

  //avatar
  useEffect(()=>{
      if (user){

          // Create a reference to the file we want to download
          
          const starsRef = ref(storage, 'public/images/' + user.profilePicture);
          getDownloadURL(starsRef)
              .then((url) => {
                  // Insert url into an <img> tag to "download"
                  setAvatar(url);
              })
      }
  }, [user, storage]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? avatar
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
