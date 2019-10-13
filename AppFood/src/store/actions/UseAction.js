export const USER_LOGIN = "USER_LOGIN"
export const LOGIN_SUCESS = "LOGIN_SUCESS"


export const login = (data) => {
    return{
        type: USER_LOGIN,
        data: data    
    }
}