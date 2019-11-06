import instance from '../axios/AxiosInstance'
import { put, takeLatest, all, fork } from 'redux-saga/effects'
import { USER_LOGIN, LOGIN_SUCESS, LOGIN_FAIL, SIGN_UP_SUCCESS, SIGN_UP_FAIL, SIGN_UP} from '../actions/UseAction'
import PATH from '../axios/Url'

function* login(action){
    const response = yield instance.post(
        PATH.LOG_IN,
        action.data
    ).then(res => res.data) // TODO: catch error

    // console.log("aejfj")
    if(response.status){
        yield put({
            type: LOGIN_SUCESS,
            data: response.account
        })
    }else {
        yield put({
            type: LOGIN_FAIL,
            message: response.message
        })
    }
}

function* loginWatcher(){
    yield takeLatest('USER_LOGIN', login)
}

function* sendMail(action){
    const response = yield instance.post(
        "api/user/sendemail",
        action.email
    ).then(res => res.data)
    .catch(err=>console.log(err)) // TODO: catch error

    if(response.status){
        yield put({
            type: LOGIN_SUCESS,
            data: response.account
        })
    }else {
        
    }
}

function* signup(action){
    const response = yield instance.post(
        PATH.SIGN_UP,
        action.data
    ).then(res=>res.data)
    .catch(err=>console.log(err))

    if(response.status){
        yield put({
            type: SIGN_UP_SUCCESS,
            account: response.account,
        })
    }else {
        yield put({
            type: SIGN_UP_FAIL,
            message: response.message
        })
    }
}

function* signupWatcher(){
    yield takeLatest('SIGN_UP', signup)
}

export default function* userSaga(){
    yield all([
        loginWatcher(),
        signupWatcher(),
    ])
}