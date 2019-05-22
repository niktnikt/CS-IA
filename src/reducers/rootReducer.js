const initState = {
    user: null
}

const rootReducer = (state = initState, action) => {
    if(action.type === 'GET_USER'){
        return{
            ...state,
            user: action.user
        }
    }else if(action.type === 'LOGOUT_USER'){
        return{
            ...state,
            user: false
        }
    }
    return state
}

export default rootReducer;