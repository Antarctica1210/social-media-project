import "./rightbar.css"
import Online from "../online/Online"
import { Users } from "../../dummyData"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {Add, Remove} from "@material-ui/icons";


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
        //call function
        getFriends();
    },[user])

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

    const HomeRightbar = () => {

        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
                    <span className="birthdayText">
                        <b>Gin Tigger</b> and <b>3 other friends</b> have a birthday today!
                    </span>
                </div>
                <img className="rightbarAd" src={`${PF}soul.jpeg`} alt="" />
                {/* online friends list */}
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {/* list all the friends */}
                    {Users.map((user) => (
                        <Online key={user.id} user={user} />
                    ))}
                </ul>
            </>

        )
    }

    const ProfileRightbar = () => {
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
                        <span className="rightbarInfoValue">{user.relationship === 1? "Single": user.relationship === 1? "Married": "-"}</span>
                    </div>
                </div>
                {/* ==================================================Friends block============================================================================ */}
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend)=>(
                        <Link to={"/profile/" + friend.username} style={{textDecoration: "none"}}>
                            <div className="rightbarFollowing">
                                <img
                                src={friend.profilePicture? PF+friend.profilePicture: PF+"person/noAvatar.png"}
                                alt=""
                                className="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
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
