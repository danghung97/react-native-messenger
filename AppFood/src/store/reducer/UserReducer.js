import {CHECK_LOGIN_SUCCESS, USER_LOGIN, LOGIN_SUCESS, LOGIN_FAIL, 
    SIGN_UP_FAIL, SIGN_UP_SUCCESS, LOGOUT_SUCCESS} from '../actions/UseAction'
import { AsyncStorage } from 'react-native';

const initial = {
    isSucces: false,
    isLoadding: false,
    error: "",
    user: null
}

const reducer = (state = initial, action) => {
    switch(action.type){
        case USER_LOGIN:
            return {...state, isLoadding: true}
        case LOGIN_SUCESS:
            AsyncStorage.setItem("account", JSON.stringify(action.data));
            global.isLogging = true;
            return {...state, user: action.data, isLoadding: false, isSucces: true, error: null}
        case CHECK_LOGIN_SUCCESS:
            global.isLogging = true;
            return {...state, user: action.data}
        case LOGIN_FAIL:
            return {...state, error: action.message, isLoadding: false, isSucces: false, user: null}
        case LOGOUT_SUCCESS:
            return {...state, user: null}
        case SIGN_UP_SUCCESS:
            AsyncStorage.setItem("account", JSON.stringify(action.data));
            global.isLogging = true;
            return {...state, isSucces: true, isLoadding: false, user: action.account, error: null}
        case SIGN_UP_FAIL:
            return {...state, isSucces: false, error: action.message, isLoadding: false}
        // case REFRESH:
        //     return {
        //         isSucces: false,
        //         isLoadding: false,
        //         error: "",
        //         user: null,
        //     }
        // case SAVE_USER:
        //     return {
        //         ...state,
        //         isSucces: false,
        //         isLoadding: false,
        //         error: "",
        //         user: action.user
        //     }
        default:
            return state
    }
}

export default reducer