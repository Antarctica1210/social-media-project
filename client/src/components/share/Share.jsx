import React, { useContext, useRef, useState, useEffect } from 'react'
import "./share.css"
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons"
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { storage } from "../../firebase";
import { ref, uploadBytes, getStorage, getDownloadURL,  deleteObject } from "firebase/storage";



export default function Share() {

    //environment variable PF = public folder
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const { user } = useContext(AuthContext);

    //desc
    const desc = useRef();

    const [file, setFile] = useState(null);
    // const [per, setPerc] = useState(null);




    //submit post function
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,

        }

        try {
            
            if (file){
                //upload to firebase
        
                const name = new Date().getTime() + file.name;

                console.log(name);
                newPost.img = "post/" + name;
                await axios.post("/posts", newPost);
                //upload to firebase
                const storageRef = ref(storage, 'public/images/post/' + name);
                uploadBytes(storageRef, file).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                    window.location.reload();
                });
                
            }else{
                await axios.post("/posts", newPost);
                //refresh the page and show the post
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

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
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImg' src={user.profilePicture ? avatar : PF + "person/noAvatar.png"} alt="" />
                    <input placeholder={'What would like to share today ' + user.username + "?"} className="shareInput" ref={desc} />
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
                            <input style={{ display: "none" }} type="file" id='file' accept='.png, .jpeg, .jpg' onChange={(e) => setFile(e.target.files[0])} />
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
