/*eslint consistent-return: 0*/

/**
 *
 * @param {function} dispatch
 * @param {function} getState
 * @returns {Promise}
 */
export default function apiMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      callApi,
      shouldCallApi = () => true,
      payload = {}
    } = action;

    if (!types) {
      // Normal action: pass it on
      return next(action);
    }

    if (!Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string')) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callApi !== 'function') {
      throw new Error('Expected `callApi` to be a function.');
    }

    if (!shouldCallApi(getState())) {
      return new Promise(() => {});  // so we can still call .then when we dispatch
    }

    const [ requestType, successType, failureType ] = types;

    dispatch({ ...payload, type: requestType });

    return new Promise((resolve, reject) => {
      callApi(dispatch).then(
        response => {
          if (response.headers.get('content-type') === 'application/json') {
            response.json().then(
              data => {
                response.data = data;  // from backend response
                dispatch({ payload, response, type: successType });
                resolve(response);
              }
            );
          } else {
            dispatch({ payload, response, type: successType });
            resolve(response);
          }
        },
        error => {
          if (error.headers && error.headers.get('content-type') === 'application/json') {
            error.json().then(
              data => {
                error.data = data;  // form backend error
                dispatch({ payload, error, type: failureType });
                reject(error);
              }
            )
          } else {
            dispatch({ payload, error, type: failureType });
            reject(error);
          }
        }
      );
    });
  };
}
