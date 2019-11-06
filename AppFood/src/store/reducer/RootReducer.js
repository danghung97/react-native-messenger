import UserReducer from './UserReducer'
import MessageSocket from './MessageSocket';
import { combineReducers} from 'redux'
const rootReducer = combineReducers({
    user: UserReducer,
    socket: MessageSocket
})

export default rootReducer