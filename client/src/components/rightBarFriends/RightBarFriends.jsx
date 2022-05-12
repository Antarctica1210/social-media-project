import React, { useEffect, useState } from 'react'
import "./rightBarFriends.css";
import { ref, getStorage, getDownloadURL } from "firebase/storage";

export default function RightBarFriends({ user }) {

    //environment variable PF = public folder
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    //set profimg and coverimg

    const [avatar, setAvatar] = useState("");

    // Create a reference to the file we want to download
    const storage = getStorage();

    //avatar
    useEffect(() => {
        if (user.profilePicture) {

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
        <div className="rightbarFollowing">
            <img
                src={user.profilePicture ? avatar : PF + "person/noAvatar.png"}
                alt=""
                className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">{user.username}</span>
        </div>
    )
}
