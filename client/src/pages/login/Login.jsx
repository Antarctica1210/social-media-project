import React, { useContext, useRef } from 'react'
import "./login.css"
import {loginCall} from "../../apiCalls"
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';



export default function Login() {

	const email = useRef();
	const password = useRef();
	const {user, isFetching, error, dispatch} = useContext(AuthContext)

	const handleClick = (e) =>{
		e.preventDefault();
		loginCall({email:email.current.value, password:password.current.value}, dispatch);
	}

	console.log(user);

	const history = useHistory();

	//redirect to register
	const toRegister = () =>{
		let path = "/register";
		history.push(path);
	}

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Social Zone</h3>
					<span className="loginDesc">Connect with friends and the world around you</span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={handleClick}>
						<input placeholder="Email" type="email" required className="loginInput" ref={email}></input>
						<input placeholder="Password" type="password" required minLength="6" className="loginInput" ref={password}></input>
						<button className="loginButton" type='submit' disabled={isFetching}>
							{isFetching? "Loading...": "Log In"}
						</button>
						<span className="haveAccount">Don't have an Account?</span>
						<button onClick={toRegister} className="loginRegisterButton">
							{isFetching? "Loading...": "Sign up"}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
