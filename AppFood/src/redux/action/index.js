export const requestSignUp = (email, password, code) => {
    return {
        type: "REQUEST_SIGNUP",
        email,
        password,
        code,
    }
}

export const requestSendEmail = (email) => {
    return {
        type: "REQUEST_SEND_EMAIL",
        email
    }
}

export const requestLogin = (email, password) =>{
    return {
        type: "REQUEST_LOGIN",
        email,
        password,
    }
}

export const requestSuccess = () => {
    return {
        type: "SUCCESS"
    }
}