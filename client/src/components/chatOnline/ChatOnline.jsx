import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";
import ChatOnlineImg from "./ChatOnlineImg";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      console.log("ChatOnline.jsx 28 :" + res)
      if(res.data){

        setCurrentChat(res.data);
      }else{
        const newConversation = {
          "senderId":currentId,
          "receiverId":user._id
        }
        const res = await axios.post("/conversations/", newConversation);
        setCurrentChat(res.data);
        console.log("create a conversation ");
      }
    } catch (err) {
      console.log(err);
    }
  };

  

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <ChatOnlineImg key={o._id} picture={o}/>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}
