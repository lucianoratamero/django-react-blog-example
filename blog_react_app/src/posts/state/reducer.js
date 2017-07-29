/*eslint no-undef: 0*/

import { fromJS } from 'immutable';
import { push } from 'react-router-redux';
import { createReducer } from '../../helpers/store';
import { PostsActionTypes } from './actions';

export const handlePostsRequest = (state, action) => {
  return state
    .set('errors', '');
}

export const handlePostsFailure = (state, action) => {
  return state
    .set('errors', 'Mal aí, não rolou de pegar os posts.' );
}

export const handlePostsSuccess = (state, action) => {

  if (action.response.status !== 200) {
    return handlePostsFailure(state, { error: action.data });
  }

  state = state
    .set('errors', '')
    .set('allPosts', action.response.data.posts)

    console.log(state)

  return state;
}

export const handleSavePostFailure = (state, action) => {
  return state.set('errors', 'Mal aí, não rolou de salvar seu post.' );
}

export const handleSavePostSuccess = (state, action) => {

  if (action.response.status !== 201) {
    return handleSavePostFailure(state, { error: action.data });
  }

  action.asyncDispatch(push('/'));
  return state;
}

export const postsReducer = createReducer(fromJS({}), {
  [PostsActionTypes.POSTS_REQUEST]: handlePostsRequest,
  [PostsActionTypes.POSTS_SUCCESS]: handlePostsSuccess,
  [PostsActionTypes.POSTS_FAILURE]: handlePostsFailure,
  [PostsActionTypes.SAVE_POST_REQUEST]: handlePostsRequest,
  [PostsActionTypes.SAVE_POST_SUCCESS]: handleSavePostSuccess,
  [PostsActionTypes.SAVE_POST_FAILURE]: handleSavePostFailure,
});
