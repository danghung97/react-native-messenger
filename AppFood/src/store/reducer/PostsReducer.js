import * as UseAction from '../actions/UseAction';

const initPost = {
  data: [],
  error: null,
}

const PostReducer = (state = initPost, action) => {
  // console.warn(action.type, action.data)
  const data = [...state.data];
  switch (action.type) {
    case UseAction.ADD_POST_SUCCESS:
      data.push(action.data.post)
      return {...state, data, error: null};
    case UseAction.ADD_POST_FAIL:
      return {...state, error: action.data.message}
    case UseAction.FETCH_POST_SUCCESS:
      data.push(...action.data.listPosts)
      return {...state, data, error: null}
    case UseAction.FETCH_POST_FAIL:
      return {...state, error: action.data.message}
    default:
      return state;
  }
}

export default PostReducer