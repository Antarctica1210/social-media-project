import React from 'react'
import "./login.css"

export default function Login() {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social Zone</h3>
                    <span className="loginDesc">Connect with friends and the world around you</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input placeHolder="Email" className="loginInput"></input>
                        <input placeHolder="Password" className="loginInput"></input>
                        <button className="loginButton">Log In</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">Create a new account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
