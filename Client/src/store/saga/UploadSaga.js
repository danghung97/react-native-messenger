import PATH from '../axios/Url';
import ApiService from '../axios/AxiosInstance';
import { put, takeLatest } from 'redux-saga/effects';
import { UPLOAD_IMAGE, UPLOAD_SUCCESS, UPLOAD_FAIL, UPDATE_AVATAR } from '../actions/UseAction'

function* uploadImage(action) {
  try {
    const response = yield ApiService.post(PATH.UPDATE_AVATAR, action.data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if(response.data) {
      if(response.data.status) {
        yield put({
          type: UPLOAD_SUCCESS,
        })
        yield put({
          type: UPDATE_AVATAR,
          data: response.data.account
          // data: 
        })
      } else {
        yield put({
          type: UPLOAD_FAIL,
          message: response.data.message
        })
      }
    }
  } catch(error) {
    // alert(error)
  }
}

export function* watcherUpload() {
  yield takeLatest(UPLOAD_IMAGE, uploadImage) 
}