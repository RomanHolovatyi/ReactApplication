import api from 'api';

export const ASYNC_ACTION_START = 'ASYNC_ACTION_START';
export const ASYNC_ACTION_START_NEWS = 'ASYNC_ACTION_START_NEWS';
export const ASYNC_ACTION_ERROR = 'ASYNC_ACTION_ERROR';
export const ASYNC_ACTION_SUCCESS = 'ASYNC_ACTION_SUCCESS';
export const ASYNC_ACTION_SUCCESS_NEWS = 'ASYNC_ACTION_SUCCESS_NEWS';
export const ASYNC_ACTION_NEWS_LOCAL = 'ASYNC_ACTION_NEWS_LOCAL'

function asyncStart() {
  return {
    type: ASYNC_ACTION_START,
  };
}

function asyncStartNews() {
  return {
    type: ASYNC_ACTION_START_NEWS,
  };
}

function asyncSuccess(data) {
  return {
    type: ASYNC_ACTION_SUCCESS,
    data,
  };
}

function asyncSuccessNews(data) {
  return {
    type: ASYNC_ACTION_SUCCESS_NEWS,
    data,
  };
}

function asyncError(error) {
  return {
    type: ASYNC_ACTION_ERROR,
    error,
  };
}

export function asyncSources() {
  return function (dispatch) {
    dispatch(asyncStart());

    api.getNewsSources()
      .then(data => dispatch(asyncSuccess(data)))
      .catch(error => dispatch(asyncError(error)));
  };
}
export function asyncNewsLocal(source) {
  return function (dispatch) {
    let data = {};
    const localStorageData = JSON.parse(localStorage.getItem(source.id));
    data.articles = localStorageData.articles;
    data.source = source.id;
    data.sortBy = 'top';
    dispatch(asyncSuccessNews(data));
  };
}

export function asyncNews(sourceName, sortBy) {
  return async function (dispatch) {
    try {
      await dispatch(asyncStartNews())
      const res = await api.getNews(sourceName, sortBy)
      console.log('action')
      dispatch(asyncSuccessNews(res))
    } catch (error) {
      console.log('err')
      dispatch(asyncError(error))
    }
  };
}

// Update
