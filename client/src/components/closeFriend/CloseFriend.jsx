import React from 'react'
import "./closeFriend.css"

export default function CloseFriend({user}) {
    //environment variable PF = public folder
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <li key={user._id} className="sidebarFriend" >
            <img className="sidebarFriendImg"  src={user.profilePicture? PF+user.profilePicture: PF+"person/noAvatar.png"} alt="" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    )
}
