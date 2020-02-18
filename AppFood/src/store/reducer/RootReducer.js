import UserReducer from './UserReducer'
import MessageSocket from './MessageSocket';
import NotifiReducer from './NotificationReducer';
import PostReducer from './PostsReducer';
import UploadReducer from './UploadReducer'
import { combineReducers} from 'redux'
const rootReducer = combineReducers({
    user: UserReducer,
    socket: MessageSocket,
    notifi: NotifiReducer,
    Posts: PostReducer,
    upload: UploadReducer,
})

export default rootReducer