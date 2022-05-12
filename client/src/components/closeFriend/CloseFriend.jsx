import React, {useEffect, useState}from 'react'
import "./closeFriend.css";
import { ref, uploadBytes, getStorage, getDownloadURL,  deleteObject } from "firebase/storage";


export default function CloseFriend({user}) {
    //environment variable PF = public folder
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    //set profimg and coverimg
    
    const [avatar, setAvatar] = useState("");

    // Create a reference to the file we want to download
    const storage = getStorage();

    //avatar
    useEffect(()=>{
        if (user.profilePicture){

            // Create a reference to the file we want to download
            
            const starsRef = ref(storage, 'public/images/' + user.profilePicture);
            getDownloadURL(starsRef)
                .then((url) => {
                    // Insert url into an <img> tag to "download"
                    setAvatar(url);
                })
        }
    }, [user.profilePicture, storage]);

    return (
        <li key={user._id} className="sidebarFriend" >
            <img className="sidebarFriendImg"  src={user.profilePicture? avatar: PF+"person/noAvatar.png"} alt="" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    )
}
