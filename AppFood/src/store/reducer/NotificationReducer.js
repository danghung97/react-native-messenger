import { NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/UseAction';

const initNotifi={
    data: {}
}

const NotifiReducer = (state = initNotifi, action) => {
    switch (action.type) {
        case NOTIFICATION:
            return {...state, data: action.data }
        case REMOVE_NOTIFICATION:
            return {...state, data: {}};
        default:
            return state;
    }
}

export default NotifiReducer;