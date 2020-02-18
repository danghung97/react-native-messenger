import { UPLOAD_IMAGE, UPLOAD_SUCCESS, UPLOAD_FAIL } from '../actions/UseAction'

const initState = {
  isLoading: false,
  err: null,
}

const UploadReducer = (state = initState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {...state, isLoading: true}
    case UPLOAD_SUCCESS:
      return {...state, isLoading: false, err: null}
    case UPLOAD_FAIL:
      return {...state, isLoading: false, err: action.message}
    default:
      return state
  }
}

export default UploadReducer