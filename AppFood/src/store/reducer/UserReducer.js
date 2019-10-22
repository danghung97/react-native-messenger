import { USER_LOGIN, LOGIN_SUCESS, LOGIN_FAIL, SIGN_UP_FAIL, SIGN_UP_SUCCESS} from '../actions/UseAction'
import { AsyncStorage } from 'react-native';
import Unstated from '../Unstated';

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
            Unstated.setAccount('account', action.data);
            return {...state, user: action.data, isLoadding: false, isSucces: true}
        case LOGIN_FAIL:
            return {...state, error: action.message, isLoadding: false, isSucces: false}
        // case SEND_MAIL:
        //     return {...state, isLoadding: true}
        case SIGN_UP_SUCCESS:
            AsyncStorage.setItem("account", JSON.stringify(action.data));
            Unstated.setAccount('account', action.data);
            return {...state, isSucces: true, isLoadding: false, user: action.account}
        case SIGN_UP_FAIL:
            return {...state, isSucces: false, error: action.message, isLoadding: false}
        default:
            return state
    }
}

export default reducer