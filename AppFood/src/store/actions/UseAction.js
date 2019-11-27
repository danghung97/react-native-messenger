export const USER_LOGIN = "USER_LOGIN"
export const LOGIN_SUCESS = "LOGIN_SUCCESS"
export const LOGIN_FAIL = "LOGIN_FAIL"
export const SIGN_UP = "SIGN_UP"
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS"
export const SIGN_UP_FAIL = "SIGN_UP_FAIL"
export const LOAD_ROOM = "LOAD_ROOM"
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE"
export const CHECK_LOGIN = "CHECK_LOGIN"
export const NOTIFICATION = "NOTIFICATION"
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION"
export const CHECK_LOGIN_SUCCESS = "CHECK_LOGIN_SUCCESS"

export const USER_LOGOUT = "USER_LOGOUT"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"

export const login = (data) => {
    return{
        type: USER_LOGIN,
        data: data    
    }
}

export const logout = () => {
    return {
        type: USER_LOGOUT
    }
}

export const loginFail = (message) => {
    return{
        type: LOGIN_FAIL,
        message
    }
}

export const sendEmail = (email) => {
    return {
        type: SEND_MAIL,
        email
    }
}

export const signup = (data) => {
    return {
        type: SIGN_UP,
        data
    }
}

export const loadroom = (received) => {
    return {
        type: LOAD_ROOM,
        received
    }
}

export const messageSocket = (message) => {
    return {
        type: RECEIVE_MESSAGE,
        message
    }
}

export const checkLogin = () => {
    return {
        type: CHECK_LOGIN,
    }
}

export const savenotifi = (data) => {
    return {
        type: NOTIFICATION,
        data
    }
}

export const removenotifi = () => {
    return {
        type: REMOVE_NOTIFICATION,
    }
}