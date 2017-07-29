import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import apiMiddleware from '../middleware/api';
import asyncDispatch from '../middleware/asyncDispatch';
import * as reducers from '../state/reducers';

/**
 *
 * @param {*} initialState
 * @param {Object} handlers
 * @returns {function}
 * @see http://redux.js.org/docs/recipes/ReducingBoilerplate.html
 */
export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

/**
 *
 * @returns {function}
 */
export function buildStore() {
  const appReducer = combineReducers(reducers);

  const rootReducer = (state, action) => {

    // Clear Redux store on logout
    return appReducer(state, action);
  }

  const middleware = [thunk,  apiMiddleware,asyncDispatch, routerMiddleware(browserHistory)];

  return createStore(rootReducer, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

}
