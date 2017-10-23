import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { asyncNews } from 'actions/app';
import NewsList from 'components/Shared/NewsList';
import makeTabActive from '../../helpers/tabs.js'

@connect(state => ({
  news: state.app.get('news'),
  currentSource: state.app.get('currentSource'),
  sortBy: state.app.get('sortBy'),
  asyncError: state.app.get('asyncError'),
  asyncLoading: state.app.get('asyncLoading'),
}))

export default class NewsBar extends Component {
  static propTypes = {
    news: PropTypes.array,
    sortBy: PropTypes.string,
    currentSource: PropTypes.string,
    asyncError: PropTypes.string,
    dispatch: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.getNewsByCategory = this.getNewsByCategory.bind(this);
  }

  getNewsByCategory(category, index) {
    makeTabActive(index)
    const { dispatch, currentSource } = this.props;
    console.log(category);
    dispatch(asyncNews(currentSource, category));
  }

  componentDidUpdate() {
    const { news, currentSource } = this.props;
    if (news === null) {
      return;
    }
    const now = new Date();
    localStorage.setItem(currentSource, JSON.stringify({ articles: news, timestamp: now.getTime() }));
  }

  render() {
    const {
      news,
      asyncError,
      currentSource,
      // asyncLoading,
    } = this.props;
    return (
      <div className='news-bar'>
        <div className='news-bar__header'>
          <h1 className='news-bar__title'>News</h1>
          <div className='news-bar__tabs'>
            <div className='news-bar__tab-item' onClick={ () => this.getNewsByCategory('top', 0) }>
              Top
            </div>
            <div className='news-bar__tab-item' onClick={ () => this.getNewsByCategory('latest', 1) }>
              Latest
            </div>
            <div className='news-bar__tab-item' onClick={ () => this.getNewsByCategory('popular', 2) }>
              Popular
            </div>
          </div>
        </div>
        <NewsList news={ news } error={ asyncError } currentSource={ currentSource } />
      </div>
    );
  }
}
