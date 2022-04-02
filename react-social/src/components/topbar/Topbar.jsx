import React from 'react'
import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@material-ui/icons"

//create the bar on the top always shown on the top screen
export default function Topbar() {
    return (
        <div className="topbarContainer">
            {/* logo of the page */}
            <div className="topbarLeft">
                <span className="logo">Social Zone</span>
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
                    <span className="topbarlink">Homepage</span>
                    <span className="topbarlink">Timeline</span>
                </div>
                {/* icons */}

                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>

                {/* topbar image */}
                <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
            </div>
        </div>
    )
}
