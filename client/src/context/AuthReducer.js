const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
            };
        case "LOGOUT":
            return{
                user: null,
                isFetching: false,
                error: false,
            };
        case "FOLLOW":
            return {
                // means consider all states (user, isFetching, error) and paste here
                ...state,
                user: {
                ...state.user,
                followings: [...state.user.followings, action.payload],
                },
            };
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    // judge if you are in the following list if yes, remove you
                    followings: state.user.followings.filter(
                        (following) => following !== action.payload
                    ),
                },
            };
        case "EDIT_INFO":
            return{
                ...state,
                user: {
                    ...state.user,
                    city: action.payload.city,
                    from: action.payload.from,
                    relationship: action.payload.relationship,
                    desc: action.payload.desc
                }
            };
        case "CHANGE_PHOTO":
            return{
                ...state,
                user: {
                    ...state.user,
                    coverPicture: action.payload.coverPicture,
                    profilePicture: action.payload.profilePicture,
            
                }
            };
        default:
            return state;
    }
};

export default AuthReducer;