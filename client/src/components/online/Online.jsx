import React, {useEffect, useState}from 'react'
import "./online.css";
import { ref, getStorage, getDownloadURL } from "firebase/storage";



export default function Online({user}) {
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
        <li key={user._id} className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" src={user.profilePicture? avatar: PF+"person/noAvatar.png"} alt="" />
                {/* <span className="rightbarOnline"></span> */}
            </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    )
}
