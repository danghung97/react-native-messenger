import instance from '../axios/AxiosInstance'
import { AsyncStorage } from 'react-native';
import { put, takeLatest, all, fork } from 'redux-saga/effects'
import {CHECK_LOGIN_SUCCESS, CHECK_LOGIN, USER_LOGIN, USER_LOGOUT, LOGIN_SUCESS, 
  LOGIN_FAIL, SIGN_UP_SUCCESS, SIGN_UP_FAIL, SIGN_UP, LOGOUT_SUCCESS} from '../actions/UseAction'
import PATH from '../axios/Url'
import ApiService from '../axios/AxiosInstance';
import axios from 'axios';
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

        ApiService.setHeader('Authorization', `Bearer ${response.account.token}`)

        axios.post('https://serverappfood.herokuapp.com/api/phone-device/push', {
            fcm_token: global.fcmToken
        },{
            headers: {
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${response.account.token}`
            },
        }).then(res => {
            if(res.data.status){
                console.warn('success', res.data.message)
            }
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

function *checkLogin() {
    const user = yield AsyncStorage.getItem("account")
    if (!user) {
      return;
    }

    userData = JSON.parse(user)
    let token = userData.token
    ApiService.setHeader('Authorization', `Bearer ${token}`)
    yield put({
      type: CHECK_LOGIN_SUCCESS,
      data: userData
    })
}

function* watchCheckLogin() {
  yield takeLatest('CHECK_LOGIN', checkLogin);
}

function* logout() {
  yield reponse =  ApiService.post(PATH.LOG_OUT, {
    fcm_token: global.fcmToken
  })
  console.warn(reponse)
  delete ApiService.headers['Authorization']
  global.isLogging = false;
  global.socket.close();
  yield AsyncStorage.removeItem("account")
  yield put({
    type: LOGOUT_SUCCESS
  })
}

function* watcherLogout() {
  yield takeLatest('USER_LOGOUT', logout)
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
        watchCheckLogin(),
        watcherLogout(),
    ])
}