import React, { useContext, useRef, useState } from 'react'
import "./share.css"
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons"
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export default function Share() {

    //environment variable PF = public folder
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const {user} = useContext(AuthContext);

    //desc
    const desc = useRef();

    const[file, setFile] = useState(null);

    //submit post function
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,

        }

        //upload pictures
        if(file){
            const data = new FormData();

            //prevent duplicate file name
            const fileName = Date.now() + file.name;

            data.append("name", fileName);
            data.append("file", file);
            //indicate post name as file's name
            newPost.img = fileName;
            try {
                const res = await axios.post("/upload", data);
                console.log(res + "=====================================");
            } catch (error) {
                console.log(error);
            }
        }

        try {
            await axios.post("/posts", newPost);
            //refresh the page and show the post
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    

    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImg' src={user.profilePicture? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" />
                    <input placeholder={'What would like to share today ' + user.username + "?"} className="shareInput" ref={desc}/>
                </div>
                <hr className='shareHr' />
                {/* show files when we choose a file============================================================== */}
                {file && (
                    <div className="shareImgContainer">
                        {/* sudo url to let us see the files */}
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor='orange' className='shareIcon' />
                            <span className="shareOptionText">Photo or Video</span>
                            <input style={{display: "none"}} type="file" id='file' accept='.png, .jpeg, .jpg' onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor='blue' className='shareIcon' />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor='green' className='shareIcon' />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type='submit'>Share</button>
                </form>
            </div>
        </div>
    )
}
