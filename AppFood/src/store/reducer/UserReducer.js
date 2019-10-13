import { USER_LOGIN, LOGIN_SUCESS, LOGIN_FAIL} from '../actions/UseAction'

const initial = {
    isSucces: false,
    isLoadding: false,
    error: "",
    user: null
}

const reducer = (state = initial, action) => {
    console.log(action.type)
    switch(action.type){
        case USER_LOGIN:
            return {...state, isLoadding: true}
        case LOGIN_SUCESS:
            return {...state, user: action.data, isLoadding: false, isSucces: true}
        case LOGIN_FAIL:
            return {...state, error: action.message, isLoadding: false}
        default:
            return state
    }
}

export default reducer