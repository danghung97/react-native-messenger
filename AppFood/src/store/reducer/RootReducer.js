import UserReducer from './UserReducer'
import MessageSocket from './MessageSocket';
import NotifiReducer from './NotificationReducer';
import PostReducer from './PostsReducer';
import { combineReducers} from 'redux'
const rootReducer = combineReducers({
    user: UserReducer,
    socket: MessageSocket,
    notifi: NotifiReducer,
    Posts: PostReducer,
})

export default rootReducer