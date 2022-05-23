import React from 'react'
import "./profile.css"
import Topbar from '../../components/topbar/Topbar'
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import EditInfo from '../../components/editInfo/EditInfo'
//firebase
import { getStorage, ref, getDownloadURL } from "firebase/storage";

//ant design
import { Modal, message, } from "antd";
import "antd/dist/antd.css";
//ant design components
const {confirm} = Modal;


export default function Profile() {
    //environment variable PF = public folder
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState({});
    const username = useParams().username;
    //context
    const {user:currentUser} = useContext(AuthContext);
    // console.log(username);
    //used to go into edit page
    const [isEdit, setIsEdit] = useState(false);
    //set profimg and coverimg
    const [cover, setCover] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
            setIsEdit(false);
        };
        fetchUser();
    }, [username]);

    // set images
    // Create a reference to the file we want to download
    const storage = getStorage();

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
    }, [user.coverPicture, storage]);

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

    const goToEdit = ()=>{
        console.log("Go to edit");
        setIsEdit(true);
    }

    const goBack = () =>{
        confirm({
            title:"Give up editing your profile?",
            content:"You will go back to your profile",
            onOk(){
                setIsEdit(false);
            },
            onCancel(){
                message.success("Keep editing");
            }


        });
        
    }

    return (
        <>
            <Topbar cover={cover} avatar = {avatar}/>
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">

                            <img className="profileCoverImg" src={
                                user.coverPicture
                                    ? cover
                                    : PF + "person/noCover.png"
                            } alt="" />
                            <img className="profileUserImg" src={
                                user.profilePicture
                                    ? avatar
                                    : PF + "person/noAvatar.png"
                            } alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.username}</h4>
                            <span className='profileInfoDesc'>{user.desc}</span>
                            {(currentUser.username === username)? (!isEdit?<button className='goToEdit' onClick={goToEdit}>Edit Profile</button>: <button className='goBack' onClick={goBack}>Go back</button>): ""}
                            
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        {isEdit?<EditInfo owner={currentUser} cover={cover} avatar={avatar}/>:<Feed username={username} avatar={avatar}/>}
                        
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>

    )
}
