import { all } from 'redux-saga/effects'
import userSaga from './UserSaga'

function* rootSaga(){
    yield all([
        userSaga()
    ])
}

export default rootSaga