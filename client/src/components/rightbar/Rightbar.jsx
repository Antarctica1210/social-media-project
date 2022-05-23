import "./rightbar.css"
import Online from "../online/Online"
// import { Users } from "../../dummyData"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {Add, Remove} from "@material-ui/icons";
// import { ref, uploadBytes, getStorage, getDownloadURL,  deleteObject } from "firebase/storage";
import RightBarFriends from "../rightBarFriends/RightBarFriends";
import { Carousel, Image } from 'antd';



export default function Rightbar({ user }) {
    //environment variable PF = public folder
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    //state to set firends
    const [friends, setFriends] = useState([]);
    //context
    const {user:currentUser, dispatch} = useContext(AuthContext);
    //check follow the user or not
    
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));
    console.log(currentUser.followings);
    console.log(user);
    console.log(currentUser.followings.includes(user?._id));
    console.log("followed:" + followed);
    


    //get user's friends (we cannot use async in useEffect, so define new function)
    useEffect(()=>{
        const getFriends = async () =>{
            try {
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        const getcurrentUserFriends = async () =>{
            try {
                const friendList = await axios.get("/users/friends/" + currentUser._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        //call function
        user? getFriends(): getcurrentUserFriends();
    },[user, currentUser])

    //follow and unfollow btn function
    const handleClick = async () => {
        try {
            if (currentUser.followings.includes(user?._id)) {
                await axios.put(`/users/${user._id}/unfollow`, {userId: currentUser._id,});
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axios.put(`/users/${user._id}/follow`, {userId: currentUser._id,});
                dispatch({ type: "FOLLOW", payload: user._id });
            }
            setFollowed(!currentUser.followings.includes(user?._id));
        } catch (err) {
            console.log(err);
        }
    };

    const contentStyle = {
        
        color: 'black',
        lineHeight: '100px',
        textAlign: 'center',
        background: 'white',
        width: "540px",
        borderRadius: "10px",
        margin: "20px 0"
    };

    const HomeRightbar = () => {

        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
                    <span className="birthdayText">
                        <b>{currentUser.username}</b> open to reveal your gift today!
                    </span>
                </div>
                {/* advertisements */}
                <div className="rightbarAd">
                    
                    <Carousel effect="fade" autoplay style={contentStyle}>
                        {/* <div>
                            <img className="rightbarAd" src={`${PF}soul.jpeg`} alt="" />
                        </div> */}
                        <div>
                            <img className="rightbarAd" src={`${PF}Pixar01.jpg`} alt="" />
                        </div>
                        <div>
                            <img className="rightbarAd" src={`${PF}Pixar05.webp`} alt="" />
                        </div>
                        <div>
                            <img className="rightbarAd" src={`${PF}Pixar06.jpg`} alt="" />
                        </div>
                        <div>
                            <img className="rightbarAd" src={`${PF}Pixar03.jpg`} alt="" />
                        </div>
                        <div>
                            <img className="rightbarAd" src={`${PF}Pixar07.jpg`} alt="" />
                        </div>
                        <div>
                            <img className="rightbarAd" src={`${PF}Pixar08.jpg`} alt="" />
                        </div>
                        
                    </Carousel>
                </div>
                {/* <img className="rightbarAd" src={`${PF}soul.jpeg`} alt="" /> */}
                {/* online friends list */}
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {/* list all the friends */}
                    {friends.map((user) => (
                        <Online key={user._id} user={user} />
                    ))}
                </ul>
            </>

        )
    }

    const ProfileRightbar = () => {

        // //environment variable PF = public folder
        // const PF = process.env.REACT_APP_PUBLIC_FOLDER

        // //set profimg and coverimg
        
        // const [avatar, setAvatar] = useState("");

        // // Create a reference to the file we want to download
        // const storage = getStorage();

        // //avatar
        // useEffect(()=>{
        //     if (user.profilePicture){

        //         // Create a reference to the file we want to download
                
        //         const starsRef = ref(storage, 'public/images/' + user.profilePicture);
        //         getDownloadURL(starsRef)
        //             .then((url) => {
        //                 // Insert url into an <img> tag to "download"
        //                 setAvatar(url);
        //             })
        //     }
        // }, [storage]);

        return (
            <>
            {/* if user is not you, you can see the follow btn  */}
            {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={handleClick}>
                    {currentUser.followings.includes(user?._id) ? "Unfollow" : "Follow"}
                    {currentUser.followings.includes(user?._id) ? <Remove /> : <Add />}
                </button>
            )}
                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship === 1? "Single": user.relationship === 2? "Married": "-"}</span>
                    </div>
                </div>
                {/* ==================================================Friends block============================================================================ */}
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend)=>(
                        <Link key={friend.username} to={"/profile/" + friend.username} style={{textDecoration: "none"}}>
                            <RightBarFriends key={friend._id} user={friend}/>
                        </Link>
                    ))}
                </div>
            </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {/* <HomeRightBar /> */}
                {user ? <ProfileRightbar /> : <HomeRightbar />}

            </div>
        </div>
    )
}
