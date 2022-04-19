import {
    useEffect,
    createContext,
    useReducer
} from "react";
import AuthReducer from "./AuthReducer";


const INITIAL_STATE = {
    // user: {
    //     _id: "622fc8e565d4bb352e62c861",
    //     username: "john",
    //     email: "john@gmail.com",
    //     password: "$2b$10$yMQBLk9Znk1F740.X06JiOJe7r5huKRyLC9fRAKNwkQS7e.LAO9lq",
    //     profilePicture: "person/5.jpeg",
    //     coverPicture: "",
    //     isAdmin: false,
    //     followers: [],
    //     followings: [],
    // }, 
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])

    return ( <AuthContext.Provider value = {
            {
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }
        } > 
        {/* use context every where in application */ } 
        {children} 
        </AuthContext.Provider>
    );
};