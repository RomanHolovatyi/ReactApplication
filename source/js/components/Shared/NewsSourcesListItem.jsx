import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { asyncNews, asyncNewsLocal } from 'actions/app';
import makeTabActive from '../../helpers/tabs.js';
// import SourcesList from 'components/Shared/NewsSourcesList';

@connect(state => ({
  sources: state.app.get('sources'),
  news: state.app.get('news'),
  asyncError: state.app.get('asyncError'),
  asyncLoading: state.app.get('asyncLoading'),
}))

export default class SourceListItem extends Component {
  static propTypes = {
    sources: PropTypes.array,
    news: PropTypes.array,
    dispatch: PropTypes.func,
  }

  getNewsBySource(source) {
    const { dispatch } = this.props;
    dispatch(asyncNews(source));
  }

  render() {
    const {
      source,
    } = this.props;
    return (
      <li
        className='sources-list-item'
        onClick={ () => {
          makeTabActive(0)
          const { dispatch } = this.props;
          if (localStorage.getItem(source.id)) {
            const now = new Date();
            const timeDifference = 1200000;
            const localStorageData = JSON.parse(localStorage.getItem(source.id));
            debugger
            if ((now.getTime() - localStorageData.timestamp) <= timeDifference) {
              dispatch(asyncNewsLocal(source));
            } else {
              localStorage.removeItem(source.id)
              dispatch(dispatch(asyncNews(source.id)));
            }
            return;
          }
          dispatch(asyncNews(source.id));
        } }
      >
        <div>
          { source.name }
        </div>
      </li>
    );
  }
}
