import React from 'react'
import { useEffect, useState } from "react";
import "./chatOnline.css";
//firebase
import { ref,  getStorage, getDownloadURL } from "firebase/storage";

export default function ChatOnlineImg({picture}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    //set profimg and coverimg

    const [avatar, setAvatar] = useState("");

    // Create a reference to the file we want to download
    const storage = getStorage();

    //avatar
    useEffect(() => {
        if (picture) {

            // Create a reference to the file we want to download

            const starsRef = ref(storage, 'public/images/' + picture.profilePicture);
            getDownloadURL(starsRef)
                .then((url) => {
                    // Insert url into an <img> tag to "download"
                    setAvatar(url);
                })
        }
    }, [picture, storage]);
    return (
        <div className="chatOnlineImgContainer">
            <img
                className="chatOnlineImg"
                src={
                    picture?.profilePicture
                        ? avatar
                        : PF + "person/noAvatar.png"
                }
                alt=""
            />
            <div className="chatOnlineBadge"></div>
        </div>
    )
}
