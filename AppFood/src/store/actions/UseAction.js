export const USER_LOGIN = "USER_LOGIN"
export const LOGIN_SUCESS = "LOGIN_SUCESS"
export const LOGIN_FAIL = "LOGIN_FAIL"


export const login = (data) => {
    return{
        type: USER_LOGIN,
        data: data    
    }
}

export const loginFail = (message) => {
    return{
        type: LOGIN_FAIL,
        message
    }
}