import { all } from 'redux-saga/effects'
import { watcherLogin, watcherCheckLogin, watcherLogout, watcherSignup } from './UserSaga'
import { watcherAddPost, watcherFetchPost } from './PostSaga'

function* rootSaga(){
    yield all([
        watcherLogin(),
        watcherCheckLogin(),
        watcherLogout(),
        watcherSignup(),
        watcherAddPost(),
        watcherFetchPost(),
        // PostSaga(),
    ])
}

export default rootSaga