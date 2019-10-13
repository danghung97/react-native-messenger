import { USER_LOGIN, LOGIN_SUCESS, LOGIN_FAIL} from '../actions/UseAction'
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
        default:
            return state
    }
}

export default reducer