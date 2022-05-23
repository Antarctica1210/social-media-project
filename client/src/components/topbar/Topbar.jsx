import React, { useContext, useState, useEffect} from 'react';
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
//firebase
import { ref, uploadBytes, getStorage, getDownloadURL,  deleteObject } from "firebase/storage";



//create the bar on the top always shown on the top screen
export default function Topbar() {

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
        <div className="topbarContainer">
            {/* logo of the page */}
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">Social Zone</span>
                </Link>
            </div>
            {/* search tools */}
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className='searchIcon'/>
                    <input type="text" className="searchInput" />
                </div>
            </div>
            {/* links, messages */}
            <div className="topbarRight">
                <div className="topbarLinks">
                    <Link to="/" style={{textDecoration:"none", color: "white"}}>
                        <span className="topbarlink">Homepage</span>
                    </Link>
                    <span className="topbarlink">Timeline</span>
                </div>
                {/* icons */}

                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        {/* <span className="topbarIconBadge">1</span> */}
                    </div>
                    <div className="topbarIconItem">
                        <Link to="/messenger" style={{textDecoration:"none" , color: "white"}}>
                            <Chat />
                            {/* <span className="topbarIconBadge">1</span> */}
                        </Link>
                        
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        {/* <span className="topbarIconBadge">1</span> */}
                    </div>
                </div>

                {/* topbar image */}
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture? avatar : PF + "person/noAvatar.png" } alt="" className="topbarImg" />

                </Link>
            </div>
        </div>
    )
}
