import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';
import axios from 'axios';

promisePolyfill.polyfill();

const API_KEY = '7b5adfaafec8410f91dbe1c5e616423b';
const baseUrl = 'https://newsapi.org/v1';

function getNewsSources() {
  return axios(`${ baseUrl }/sources/?apiKey=${ API_KEY }`)
    .then(response => response.data);
}

async function getNews(sourceName, sortBy = 'top') {
  try {
    const response = await axios.get(`${ baseUrl }/articles/?source=${ sourceName }&sortBy=${ sortBy }&apiKey=${ API_KEY }`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export default {
  getNewsSources,
  getNews,
};
