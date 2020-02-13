import { all } from 'redux-saga/effects'
import { watcherLogin, watcherCheckLogin, watcherLogout, watcherSignup } from './UserSaga'
import { watcherAddPost } from './PostSaga'

function* rootSaga(){
    yield all([
        watcherLogin(),
        watcherCheckLogin(),
        watcherLogout(),
        watcherSignup(),
        watcherAddPost(),
        // PostSaga(),
    ])
}

export default rootSaga