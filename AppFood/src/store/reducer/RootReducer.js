import UserReducer from './UserReducer'
import MessageSocket from './MessageSocket';
import NotifiReducer from './NotificationReducer';
import { combineReducers} from 'redux'
const rootReducer = combineReducers({
    user: UserReducer,
    socket: MessageSocket,
    notifi: NotifiReducer
})

export default rootReducer