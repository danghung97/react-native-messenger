import * as UseAction from '../actions/UseAction';

const initPost = {
  data: [],
  error: null,
  isLoading: false,
};

const PostReducer = (state = initPost, action) => {
  // console.warn(action.type, action.data)
  const data = [...state.data];
  switch (action.type) {
    case UseAction.FETCH_POST:
      return {...state, isLoading: true};
    case UseAction.ADD_POST_SUCCESS:
      data.push(action.data.post);
      return {...state, data, error: null, isLoading: false};
    case UseAction.ADD_POST_FAIL:
      return {...state, error: action.data.message, isLoading: false};
    case UseAction.FETCH_POST_SUCCESS:
      data.push(...action.data.listPosts);
      return {...state, data, error: null, isLoading: false};
    case UseAction.FETCH_FIRST_TIME:
      const newData = [...action.data.listPosts];
      return {...state, data: newData, error: null, isLoading: false};
    case UseAction.FETCH_POST_FAIL:
      return {...state, error: action.data.message, isLoading: false};
    default:
      return state;
  }
};

export default PostReducer;
