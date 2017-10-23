import { Map } from 'immutable';

import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_START_NEWS,
  ASYNC_ACTION_ERROR,
  ASYNC_ACTION_SUCCESS,
  ASYNC_ACTION_SUCCESS_NEWS,
} from 'actions/app';

const initialState = Map({
  counter: 0,
  asyncLoading: false,
  asyncError: null,
  sources: null,
  news: null,
  sortBy: null,
  currentSource: null,
});

const actionsMap = {

  // Async action
  [ASYNC_ACTION_START]: (state) => {
    return state.merge(Map({
      asyncLoading: true,
      asyncError: null,
      sources: null,
    }));
  },
  [ASYNC_ACTION_START_NEWS]: (state) => {
    return state.merge(Map({
      asyncLoading: true,
      asyncError: null,
      news: null,
    }));
  },
  [ASYNC_ACTION_ERROR]: (state, action) => {
    return state.merge(Map({
      asyncLoading: false,
      asyncError: action.error.message,
    }));
  },
  [ASYNC_ACTION_SUCCESS]: (state, action) => {
    return state.merge(Map({
      asyncLoading: false,
      sources: action.data.sources,
    }));
  },
  [ASYNC_ACTION_SUCCESS_NEWS]: (state, action) => {
    return state.merge(Map({
      asyncLoading: false,
      news: action.data.articles,
      sortBy: action.data.sortBy,
      currentSource: action.data.source,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
