import { ADD_POST_FAIL, ADD_POST, ADD_POST_SUCCESS } from '../actions/UseAction';

const initPost = {
  data: [],
  error: null,
}

const PostReducer = (state = initPost, action) => {
  // console.warn(action.type, action.data)
  switch (action.type) {
    case ADD_POST_SUCCESS:
      return {...state, data: action.data.posts};
    case ADD_POST_FAIL:
      return {...state, error: action.data.message}
    default:
      return state;
  }
}

export default PostReducer