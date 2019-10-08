import UserReducer from './UserReducer'
import { combineReducers} from 'redux'
const rootReducer = combineReducers({
    user: UserReducer
})

export default rootReducer