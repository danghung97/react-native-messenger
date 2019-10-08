import { USER_LOGIN, LOGIN_SUCESS} from '../actions/UseAction'

const initial = {
    isSucces: "",
    isLoadding: false,
    error: ""
}

const reducer = (state = initial, action) => {
    console.log(action.type)
    switch(action.type){
        case USER_LOGIN:
            return state
        case LOGIN_SUCESS:
            return {...state, user: action.data}
        default:
            return state
    }
}

export default reducer