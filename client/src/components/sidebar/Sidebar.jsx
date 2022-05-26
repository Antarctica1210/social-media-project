import "./sidebar.css"
import { RssFeed, Chat, PlayCircleFilledOutlined, Group, Bookmark, HelpOutline, WorkOutline, Event, School } from "@material-ui/icons"
import CloseFriend from "../closeFriend/CloseFriend"
// import {Users} from "../../dummyData"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom";


export default function Sidebar() {

    //set allUsers
    const [allUsers, setallUsers] = useState([]);

    //fetch all users
    useEffect(() =>{
        const fetchAllUsers = async () =>{
            try {
                const res = await axios.get("/users/allusers");
                console.log(res.data);
                setallUsers(res.data);
            } catch (err) {
                console.log(err);
            }
            
        };
        fetchAllUsers();
    },[]);






    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarWrapper">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon"/>
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className="sidebarIcon"/>
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon"/>
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon"/>
                        <span className="sidebarListItemText">Bookmark</span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon"/>
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon"/>
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                    <button className="sidebarButton">Show More</button>
                    {/* list all users================================================================================ */}
                    <hr className="sidebarHr"/>
                    {/* <h2>All users</h2> */}
                    <ul className="sidebarFriendList">
                        {/* list all the friends */}
                        {allUsers.map((user) => (
                            <Link key={user._id} to={"/profile/" + user.username} className="sidebarFriendBlock" style={{textDecoration: "none" ,color: "black"}}>
                                <CloseFriend key={user._id} user={user}/>
                            </Link>
                            
                        ))}
                    </ul>
                </ul>
            </div>
        </div>
    )
}
