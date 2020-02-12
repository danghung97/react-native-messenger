import { all } from 'redux-saga/effects'
import { watcherLogin, watcherCheckLogin, watcherLogout, watcherSignup } from './UserSaga'
// import PostSaga from './PostSaga'

function* rootSaga(){
    yield all([
        watcherLogin(),
        watcherCheckLogin(),
        watcherLogout(),
        watcherSignup(),
        // PostSaga(),
    ])
}

export default rootSaga