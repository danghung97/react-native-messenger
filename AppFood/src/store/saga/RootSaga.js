import { all } from 'redux-saga/effects'
import { watcherLogin, watcherCheckLogin, watcherLogout, watcherSignup } from './UserSaga'
import { watcherAddPost, watcherFetchPost } from './PostSaga'
import { watcherUpload } from './UploadSaga'

function* rootSaga(){
    yield all([
        watcherLogin(),
        watcherCheckLogin(),
        watcherLogout(),
        watcherSignup(),
        watcherAddPost(),
        watcherFetchPost(),
        watcherUpload()
        // PostSaga(),
    ])
}

export default rootSaga