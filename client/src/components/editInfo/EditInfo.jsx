import './editInfo.css';
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';

import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { Cancel } from "@material-ui/icons"


import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect, useContext } from "react";

//firebase
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
//socket.io
import { io } from "socket.io-client";


//ant design
import { Modal, message, } from "antd";
import "antd/dist/antd.css";
//ant design components
const {confirm} = Modal;



const Input = styled('input')({
    display: 'none',
});



export default function EditInfo({cover, avatar}) {

    //environment variable PF = public folder
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    //context
    const { user: currentUser, dispatch } = useContext(AuthContext);

    //set cover image
    const [coverImg, setcoverImg] = useState(null);
    //set profile image
    const [profImg, setProfImg] = useState(null);

    //create references
    // const email = useRef();
    // const password = useRef();
    // const passwordAgain = useRef();
    const city = useRef();
    const from = useRef();
    const [relationship, setRelationship] = useState(currentUser.relationship? currentUser.relationship : 3);
    const desc = useRef();
    //reenter password is correct?
    // const [isCorrect, setIsCorrect] = useState(true);

    const relationshipChange = (event) => {
        setRelationship(event.target.value);
    };

    const handleClickUpdate = async (e) =>{
        e.preventDefault();
        
        const editUser = {
            userId: currentUser._id,
            // email: email.current.value,
            // password: password.current.value,
            city: city.current.value.trim()? city.current.value.trim() : currentUser.city,
            from: from.current.value.trim()? from.current.value.trim() : currentUser.from,
            relationship: relationship,
            desc: desc.current.value.trim()? desc.current.value.trim() : currentUser.desc
        };
        console.log(editUser)
        try {
            // eslint-disable-next-line no-undef
            const res = await axios.put("/users/" + currentUser._id, editUser);
            dispatch({type:"EDIT_INFO", payload: editUser});
            console.log(res);
            window.location.reload();

        } catch (err) {
            console.log(err);
        }
        
    }

    // const socket = useRef();
    // useEffect(()=>{
    //     socket.current = io("ws://localhost:8900");
    // })

    const history = useHistory();

    const logout = ()=>{
        console.log("logout");

        confirm({
            title:"Are you sure to logout?",
            content:"You will go back to login page",
            onOk(){
                dispatch({type: "LOGOUT"});
                message.success("logout successfully");
                //to login apge
                history.push("/login");
                window.location.reload();
            },
            onCancel(){
                message.success("Keep editing");
            }


        });
        
    }

    //reload page
    
    const changeCover = (e)=>{
        e.preventDefault();
        if(coverImg){
            //create new object
            const newPhoto = {
                userId: currentUser._id,
                coverPicture: coverImg? "cover/" + new Date().getTime() + coverImg.name : currentUser.coverPicture,
                profilePicture: profImg? "person/" + new Date().getTime() + profImg.name : currentUser.profilePicture
            }
            console.log(newPhoto);

            confirm({
                title:"Are you sure to change picture?",
                async onOk(){
                    try {
                        //update in mongoodb
                        const res = await axios.put("/users/" + currentUser._id, newPhoto);
                        console.log(res);
                        dispatch({type:"CHANGE_PHOTO", payload: newPhoto});
                        console.log("start upload")
                        const storageRef = ref(storage, 'public/images/' + newPhoto.coverPicture);
                            uploadBytes(storageRef, coverImg).then((snapshot) => {
                            console.log('Uploaded a blob or file!');
                            window.location.reload();
                        });
                    } catch (error) {
                        console.log(error)
                    }

                },
                onCancel(){
                    message.success("Keep editing");
                }
            });
        }
    }

    const changeAvatar = (e)=>{
        e.preventDefault();
        if(profImg){

            const newPhoto = {
                userId: currentUser._id,
                coverPicture: coverImg? "cover/" + new Date().getTime() + coverImg.name : currentUser.coverPicture,
                profilePicture: profImg? "person/" + new Date().getTime() + profImg.name : currentUser.profilePicture
            }
            console.log(newPhoto);

            confirm({
                title:"Are you sure to change picture?",
                async onOk(){
                    try {
                        //update in mongoodb
                        const res = await axios.put("/users/" + currentUser._id, newPhoto);
                        console.log(res);
                        dispatch({type:"CHANGE_PHOTO", payload: newPhoto});
                        const storageRef = ref(storage, 'public/images/' + newPhoto.profilePicture);
                            uploadBytes(storageRef, profImg).then((snapshot) => {
                            console.log('Uploaded a blob or file!');
                            window.location.reload();
                        });
                    } catch (error) {
                        console.log(error)
                    }

                },
                onCancel(){
                    message.success("Keep editing");
                }
            });
        }
    }

    // //set profimg and coverimg
    // const [cover, setCover] = useState("");
    // const [avatar, setAvatar] = useState("");

    // // Create a reference to the file we want to download
    // const storage = getStorage();

    // //cover
    // useEffect(()=>{
    //     if (currentUser.coverPicture){

    //         // Create a reference to the file we want to download
            
    //         const starsRef = ref(storage, 'public/images/' + currentUser.coverPicture);
    //         getDownloadURL(starsRef)
    //             .then((url) => {
    //                 // Insert url into an <img> tag to "download"
    //                 setCover(url);
    //             })
    //     }
    // }, [currentUser.coverPicture, storage]);

    // //avatar
    // useEffect(()=>{
    //     if (currentUser.profilePicture){

    //         // Create a reference to the file we want to download
            
    //         const starsRef = ref(storage, 'public/images/' + currentUser.profilePicture);
    //         getDownloadURL(starsRef)
    //             .then((url) => {
    //                 // Insert url into an <img> tag to "download"
    //                 setAvatar(url);
    //             })
    //     }
    // }, [currentUser.profilePicture, storage]);





    return (
        <div className='editInfo'>
            <div className="editInfoWrapper">
                <div className='pictureBlock'>
                    <div className="profileCoverSmall">
                        {/* cover image block */}
                        <label htmlFor="icon-button-file-cover" id='coverImgBtn'>
                            <Input accept="image/*" id="icon-button-file-cover" type="file" onChange={(e) => setcoverImg(e.target.files[0])}/>
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        {coverImg? <Cancel className="shareCancelImgSmall" onClick={() => setcoverImg(null)} /> : ""}
                        {coverImg? <img className="profileCoverImgSmall" src={URL.createObjectURL(coverImg)} alt=''/> 
                            :<img className="profileCoverImgSmall" src={
                                currentUser.coverPicture
                                ? cover
                                : PF + "person/noCover.png"
                            } alt="" />
                        }

                        {/* profile img blick */}
                        <label htmlFor="icon-button-file-user" id='profileImgBtn'>
                            <Input accept="image/*" id="icon-button-file-user" type="file" onChange={(e) => setProfImg(e.target.files[0])}/>
                            <IconButton color="secondary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        
                        {profImg? <Cancel className="shareCancelImgSmall2" onClick={() => setProfImg(null)} />: "" }
                        {profImg? <img className="profileUserImgSmall" src={URL.createObjectURL(profImg)} alt=''/>
                            :<img className="profileUserImgSmall" src={
                                currentUser.profilePicture
                                ? avatar
                                : PF + "person/noAvatar.png"
                            } alt="" />
                        }

                    </div>
                    {/* <ButtonGroup variant="outlined" aria-label="outlined button group" style={{ width: "96%", margin: "0 10px 10px 10px" }}>
                        <Button>Change Cover Image</Button>
                        <Button>Change Avatr</Button>
                    </ButtonGroup> */}
                    <Button variant="outlined" className='submitBtn' onClick={changeCover} disabled={coverImg? false: true} style={{ width: "96%", margin: "0 10px 10px 10px" }} >Change Cover Image</Button>
                    <Button variant="outlined" className='submitBtn' onClick={changeAvatar} disabled={profImg? false: true} style={{ width: "96%", margin: "0 10px 10px 10px" }} >Change Avatr</Button>
                </div>

                <div className='infoList'>
                    <div className='infolistWrapper'>
                        <Box
                            className='infoForm'
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '70%' },
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleClickUpdate}
                        >
                            <h2 className="infoTitle">Personal Information</h2>
                            {/* <TextField
                                id="standard-email-input"
                                label="Email"
                                type="email"
                                inputRef={email}
                                variant="standard"
                                placeholder={currentUser.email}
                            />
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                inputRef={password}
                                autoComplete="current-password"
                                variant="standard"
                            />
                            {isCorrect? "":<span className='passwordJudge' >Password does't match</span>}
                            <TextField
                                id="standard-confirm-password-input"
                                label="Confirm Password"
                                type="password"
                                inputRef={passwordAgain}
                                variant="standard"
                            /> */}
                            
                            <TextField
                                id="standard-city-input"
                                label="City"
                                type="text"
                                inputRef={city}
                                variant="standard"
                                placeholder={currentUser.city}
                            />
                            <TextField
                                id="standard-from-input"
                                label="From"
                                type="text"
                                inputRef={from}
                                variant="standard"
                                placeholder={currentUser.from}
                            />
                            <div className='formControl'>

                                <FormControl >
                                    <FormLabel id="demo-row-radio-buttons-group-label">Relationship</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={relationship}
                                        onChange={relationshipChange}
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="Single" />
                                        <FormControlLabel value="2" control={<Radio />} label="Married" />
                                        <FormControlLabel value="3" control={<Radio />} label="Secret" />

                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <TextField
                                id="standard-multiline-flexible"
                                label="Description"
                                multiline
                                maxRows={4}
                                // value={value}
                                // onChange={handleChange}
                                inputRef={desc}
                                variant="standard"
                                placeholder={currentUser.desc}
                            />


                            <Button variant="outlined" className='submitBtn' type="submit" style={{ width: "70%", margin: "10px" }} >Confirm Edit</Button>
                            <Button variant="outlined" className='submitBtn' onClick={logout} style={{ width: "70%", margin: "10px" }} color="error" >Log out</Button>

                        </Box>


                    </div>
                </div>
            </div>
        </div>
    )
}
