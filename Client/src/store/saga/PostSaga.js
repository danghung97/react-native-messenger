import * as UseAction from '../actions/UseAction';
import { put, takeLatest, all } from 'redux-saga/effects';
import PATH from '../axios/Url';
import ApiService from '../axios/AxiosInstance';
import _ from 'lodash'

function* AddPost(action) {
  try {
    const response = yield ApiService.post(
      PATH.ADD_POST,
      action.data
    )

    if (response && _.get(response, 'data.status', false)) {
      yield put({
        type: UseAction.ADD_POST_SUCCESS,
        data: response.data
      })
    } else {
      yield put({
        type: UseAction.ADD_POST_FAIL,
        data: response.data
      })
    }
  }
  catch {
    err => console.warn(err)
  }
}

function *RemovePost(action) {

}

export function* watcherRemovePost() {
  yield takeLatest(UseAction.REMOVE_POST, RemovePost)
}

function *FetchPost(action) {
  try {
    const response = yield ApiService.get(PATH.FETCH_POST+`?offset=${action.offset}`)

    if(response && _.get(response, 'data.status', false)) {
      yield put({
        type: UseAction.FETCH_POST_SUCCESS,
        data: response.data
      })
    } else {
      yield put({
        type: UseAction.FETCH_POST_FAIL,
        data: response.data
      })
    }
  } catch {

  }
}

export function* watcherFetchPost() {
  yield takeLatest(UseAction.FETCH_POST, FetchPost)
}

export function* watcherAddPost() {
  yield takeLatest(UseAction.ADD_POST, AddPost)
}

// export default function* PostSaga(){
//   yield all([
//     AddPostWatcher(),
//   ])
// }