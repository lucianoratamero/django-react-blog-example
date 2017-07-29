/*eslint consistent-return: 0*/
/*eslint no-undef: 0*/

import { forEach, isUndefined } from 'lodash';

if (isUndefined(process.env.REACT_APP_API_URL)) {
  throw new Error('process.env.REACT_APP_API_URL must be set.');
}

/**
 *
 * @param {string} url
 * @param {Object} init
 * @param {function} dispatch
 * @returns {Promise}
 */
export function fetchFromApi(url, init, dispatch) {
  return new Promise((resolve, reject) => {
    fetch(buildRequest(url, init))
      .then(response => {
        switch (response.status) {
          case 401:
            if (response.url === buildApiUrl('auth/login/')) {
              // Login failed
              reject(response);
            }
            // Access denied (Token has expired)
            return reject(response);
          case 404:
          case 400:
          case 403:
          case 409:
          case 500:
            return reject(response);
          default:
            // Ok
            return resolve(response);
        }
      })
      .catch(err => reject(err));
  });
}

/**
 *
 * @param {string} url
 * @param {Object} init
 * @returns {Request}
 */
export function buildRequest(url, init) {
  const request = new Request(buildApiUrl(url), { ...init, mode: 'cors' });

  return request;
}

/**
 *
 * @param {Object} query
 * @returns {string}
 */
export function buildQueryString(query) {
  const pairs = [];

  forEach(query, (value, key) => {
    pairs.push([key, value].join('='));
  });

  return pairs.length ? '?' + pairs.join('&') : '';
}

/**
 *
 * @param {string} url
 * @returns {string}
 */
function buildApiUrl(url) {
  let protocol = window.location.protocol;
  return [protocol + '//' + process.env.REACT_APP_API_URL, url].join('/');
}
