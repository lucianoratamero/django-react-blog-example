/*eslint no-undef: 0*/

import { fetchFromApi } from '../../helpers/api';

export const PostsActionTypes = {
  POSTS_REQUEST: 'POSTS/CREATE_REQUEST',
  POSTS_SUCCESS: 'POSTS/CREATE_SUCCESS',
  POSTS_FAILURE: 'POSTS/CREATE_FAILURE',
  SAVE_POST_REQUEST: 'POSTS/SAVE_POST_REQUEST',
  SAVE_POST_SUCCESS: 'POSTS/SAVE_POST_SUCCESS',
  SAVE_POST_FAILURE: 'POSTS/SAVE_POST_FAILURE',
};

export const getPosts = () => {

  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  const init = {
    method: 'GET',
    headers
  };

  return {
    types: [
      PostsActionTypes.POSTS_REQUEST,
      PostsActionTypes.POSTS_SUCCESS,
      PostsActionTypes.POSTS_FAILURE
    ],
    shouldCallApi: state => !state.posts.get('allPosts'),
    callApi: dispatch => fetchFromApi('posts/', init, dispatch)
  };
}

export const savePost = (formData) => {

  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  const init = {
    method: 'POST',
    headers,
    body: formData
  };

  return {
    types: [
      PostsActionTypes.SAVE_POST_REQUEST,
      PostsActionTypes.SAVE_POST_SUCCESS,
      PostsActionTypes.SAVE_POST_FAILURE
    ],
    shouldCallApi: state => () => true,
    callApi: dispatch => fetchFromApi('post/new/', init, dispatch)
  };
}
