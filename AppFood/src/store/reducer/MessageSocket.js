import { RECEIVE_MESSAGE } from '../actions/UseAction';

const initMessage = {
    message: [],
    number: 1
}

const MessageReducer = (state = initMessage, action) => {
    switch (action.type) {
        case RECEIVE_MESSAGE:
            let temp = state.message.filter(msg => msg.rid !== action.message.rid)
            return {...state, message: temp.concat(action.message)}
        default:
            return {...state}
    }
}

export default MessageReducer;