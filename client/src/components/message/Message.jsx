import "./message.css";
import { format } from "timeago.js";

//fetch avatar from firebase

export default function Message({ message, own, avatar }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {own &&<img
          className="messageImg"
          src={avatar}
          alt=""
        />}
        {/* <div className="messageImg">{own?"john":"jane"}</div> */}
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
