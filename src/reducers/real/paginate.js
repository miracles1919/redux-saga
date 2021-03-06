/* eslint-disable no-case-declarations */

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export default function paginate ({ types, mapActionToKey }) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }

  const [requestType, successType, failureType] = types;

  function updatePagination (state = {
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    ids: [],
  }, action) {
    switch (action.type) {
      case requestType:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case successType:
        return Object.assign({}, state, {
          isFetching: false,
          ids: [...state.ids, ...action.response.result],
          nextPageUrl: action.response.nextPageUrl,
          pageCount: state.pageCount + 1,
        });
      case failureType:
        return Object.assign({}, state, {
          isFetching: false,
        });
      default:
        return state;
    }
  }

  return function updatePaginationByKey (state = {}, action) {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action);
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.');
        }
        return Object.assign({}, state, {
          [key]: updatePagination(state[key], action),
        });
      default:
        return state;
    }
  };
}
