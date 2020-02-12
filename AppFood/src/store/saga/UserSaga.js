import { AsyncStorage } from 'react-native';
import { put, takeLatest, all } from 'redux-saga/effects';
import {CHECK_LOGIN_SUCCESS, CHECK_LOGIN, USER_LOGIN, USER_LOGOUT, LOGIN_SUCESS, ADD_POST, 
  LOGIN_FAIL, SIGN_UP_SUCCESS, SIGN_UP_FAIL, SIGN_UP, LOGOUT_SUCCESS, ADD_POST_SUCCESS, ADD_POST_FAIL} from '../actions/UseAction';
import PATH from '../axios/Url';
import ApiService from '../axios/AxiosInstance';
import axios from 'axios';

function* login(action){
  try{
    const response = yield ApiService.post(
        PATH.LOG_IN,
        action.data
    )

    if( response && response.data.status){
      yield put({
        type: LOGIN_SUCESS,
        data: response.data.account
      })

      ApiService.setHeader('Authorization', `Bearer ${response.data.account.token}`)

      axios.post('https://serverappfood.herokuapp.com/api/phone-device/push', {
        fcm_token: global.fcmToken
      },{
        headers: {
          "Content-Type": 'application/json',
          'Authorization': `Bearer ${response.data.account.token}`
        },
      }).then(res => {
          if(res.data.status){
              console.warn('success', res.data.message)
          }
      })
    }else {
      yield put({
        type: LOGIN_FAIL,
        message: response.data.message
      })
    }
  }
  catch {
    err => console.warn(err)
  }
}

function* loginWatcher(){
  yield takeLatest(USER_LOGIN, login)
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
  yield takeLatest(CHECK_LOGIN, checkLogin);
}

function* logout() {
  yield reponse =  ApiService.post(PATH.LOG_OUT, {
    fcm_token: global.fcmToken
  })
  delete ApiService.headers['Authorization']
  global.isLogging = false;
  global.socket.close();
  yield AsyncStorage.removeItem("account")
  yield put({
    type: LOGOUT_SUCCESS
  })
}

function* watcherLogout() {
  yield takeLatest(USER_LOGOUT, logout)
}

function* sendMail(action){
    const response = yield ApiService.post(
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
  try{
    const response = yield ApiService.post(
      PATH.SIGN_UP,
      action.data
    )

    if(response.data.status){
      yield put({
        type: SIGN_UP_SUCCESS,
        account: response.data.account,
      })
    }else {
      yield put({
        type: SIGN_UP_FAIL,
        message: response.data.message
      })
    }
  }
  catch{
    err => console.warn(err)
  }
}

function* signupWatcher(){
  yield takeLatest(SIGN_UP, signup)
}

function* addPost(action) {
  // try {
    console.warn('1212')
    const response = yield ApiService.post(
      PATH.ADD_POST,
      action.data
    )

    console.warn('res', response)
    if (response && _.get(response, 'data.status', false)) {
      yield put({
        type: ADD_POST_SUCCESS,
        data: response.data
      })
    } else {
      yield put({
        type: ADD_POST_FAIL,
        data: response.data
      })
    }
  // }
  // catch {
  //   err => console.warn(err)
  // }
}

function* AddPostWatcher() {
  yield takeLatest(ADD_POST, addPost)
}

export default function* userSaga(){
  yield all([
    AddPostWatcher(),
    loginWatcher(),
    signupWatcher(),
    watchCheckLogin(),
    watcherLogout(),
  ])
}