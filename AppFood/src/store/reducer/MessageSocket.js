import { RECEIVE_MESSAGE } from '../actions/UseAction';

const initMessage = {
    message: [],
    data_webrtc: null,
    number: 1 // number of unread message, not started
}

const MessageReducer = (state = initMessage, action) => {
    switch (action.type) {
        case RECEIVE_MESSAGE:
            if (action.message.type_message === 'WebRTC') {
              return {...state, data_webrtc: action.message}
            }
            else{
              let temp = state.message.filter(msg => msg.rid !== action.message.rid)
              return {...state, message: temp.concat(action.message)}
            }
        default:
            return {...state}
    }
}

export default MessageReducer;