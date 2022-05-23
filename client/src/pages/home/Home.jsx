import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import "./home.css"
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";


//firebase
import { storage } from "../../firebase";
import { ref, uploadBytes, getStorage, getDownloadURL,  deleteObject } from "firebase/storage";

export default function Home() {
    const {user} = useContext(AuthContext)

    //set profimg and coverimg
    const [cover, setCover] = useState("");
    const [avatar, setAvatar] = useState("");

    // // Create a reference to the file we want to download
    // const storage = getStorage();

    //cover
    useEffect(()=>{
        if (user.coverPicture){

            // Create a reference to the file we want to download
            
            const starsRef = ref(storage, 'public/images/' + user.coverPicture);
            getDownloadURL(starsRef)
                .then((url) => {
                    // Insert url into an <img> tag to "download"
                    setCover(url);
                })
        }
    }, [user]);

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
    }, [user]);
    return (
        
        <>
            <Topbar cover={cover} avatar = {avatar}/>
            <div className="homeContainer">
                <Sidebar cover={cover} avatar = {avatar}/>
                <Feed cover={cover} avatar = {avatar}/>
                <Rightbar cover={cover} avatar = {avatar}/>
            </div>
        
        </>

    )
}