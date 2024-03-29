import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./register.css";



export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    //redirect to login page
    const history = useHistory();

    const handleClick = async (e) =>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match");
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                
            };
            try {
                await axios.post("/auth/register", user);
                //to login apge
                history.push("/login");
            } catch (err) {
                console.log(err);
            }
        }
    }

    //direct to login
    
    const toLogin = () =>{
        let path = "/login";
        history.push(path);
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social Zone</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you 
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Username" required ref={username} className="loginInput" />
                        <input placeholder="Email" required ref={email} className="loginInput" type="email"/>
                        <input placeholder="Password" required ref={password} className="loginInput" type="password" minLength="6"/>
                        <input placeholder="Password Again" required ref={passwordAgain} className="loginInput" type="password"/>
                        <button className="loginButton" type="submit">Sign Up</button>
                        <span className="haveAccount">Already have an Account?</span>
                        <button onClick={toLogin} className="loginRegisterButton">
                            Log into Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
