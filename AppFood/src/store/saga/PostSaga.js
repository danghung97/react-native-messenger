import { ADD_POST_SUCCESS, ADD_POST_FAIL, ADD_POST } from '../actions/UseAction';
import { put, takeLatest, all } from 'redux-saga/effects';
import PATH from '../axios/Url';
import ApiService from '../axios/AxiosInstance';
import _ from 'lodash'

function* AddPost(action) {
  console.warn('1')
  try {
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
  }
  catch {
    err => console.warn(err)
  }
}

export default function* AddPostWatcher() {
  yield takeLatest('ADD_POST', AddPost)
}

// export default function* PostSaga(){
//   yield all([
//     AddPostWatcher(),
//   ])
// }