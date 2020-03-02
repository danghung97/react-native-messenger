export const USER_LOGIN = "USER_LOGIN";
export const LOGIN_SUCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAIL = "SIGN_UP_FAIL";
export const LOAD_ROOM = "LOAD_ROOM";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const CHECK_LOGIN = "CHECK_LOGIN";
export const NOTIFICATION = "NOTIFICATION";
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
export const CHECK_LOGIN_SUCCESS = "CHECK_LOGIN_SUCCESS";

export const USER_LOGOUT = "USER_LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const ADD_POST = "ADD_POST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAIL = "ADD_POST_FAIL";
export const REMOVE_POST = "REMOVE_POST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAIL = "REMOVE_POST_FAIL";
export const FETCH_POST = "FETCH_POST";
export const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
export const FETCH_FIRST_TIME = 'FETCH_FIRST_TIME';
export const FETCH_POST_FAIL = "FETCH_POST_FAIL";

export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const UPLOAD_FAIL = "UPLOAD_FAIL";

export const UPDATE_USER = "UPDATE_USER"

export const login = (data) => {
  return{
    type: USER_LOGIN,
    data,
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

export const AddPost = (data) => {
  return {
    type: ADD_POST,
    data
  }
}

export const FetchPost = (offset) => {
  return {
    type: FETCH_POST,
    offset
  }
}

export const UploadImage = (data) => {
  return {
    type: UPLOAD_IMAGE,
    data
  }
}