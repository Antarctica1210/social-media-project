import "./rightbar.css"
import Online from "../online/Online"
import { Users } from "../../dummyData"

export default function Rightbar({ profile }) {
    //environment variable PF = public folder
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const HomeRightBar = () => {
        
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
                    <span className="birthdayText">
                        <b>Gin Tigger</b> and <b>3 other friends</b> have a birthday today!
                    </span>
                </div>
                <img className="rightbarAd" src={`${PF}soul.jpeg`} alt=""/>
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

    const ProfileRightBar = () => {
        return (
            <>
                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">Hamilton</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">Haerbin</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">secret</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    <div className="rightbarFollowing">
                        <img
                            src={`${PF}person/1.jpeg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John </span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={`${PF}person/2.jpeg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John </span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={`${PF}person/3.jpeg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John Carter</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={`${PF}person/4.jpeg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John Carter</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={`${PF}person/5.jpeg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John </span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={`${PF}person/6.jpeg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John </span>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <ProfileRightBar />
            </div>
        </div>
    )
}
