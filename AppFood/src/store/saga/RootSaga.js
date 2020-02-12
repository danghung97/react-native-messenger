import { all } from 'redux-saga/effects'
import userSaga from './UserSaga'
import PostSaga from './PostSaga'

function* rootSaga(){
    yield all([
        userSaga(),
        // PostSaga(),
    ])
}

export default rootSaga