import instance from '../axios/AxiosInstance'
import { put, takeLatest, all, fork } from 'redux-saga/effects'
import { USER_LOGIN, LOGIN_SUCESS} from '../actions/UseAction'

function* login(action){
    const response = yield instance.post(
        "api/user/login",
        action.data
    ).then(res => res.data.account) // TODO: catch error

    console.log("aejfj")
    yield put({
        type: LOGIN_SUCESS,
        data: response
    })
}

function* loginWatcher(){
    yield takeLatest('USER_LOGIN', login)
}

export default function* userSaga(){
    yield all([
        loginWatcher()
    ])
}