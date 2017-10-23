import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { asyncSources } from 'actions/app';
import SourcesList from 'components/Shared/NewsSourcesList';

@connect(state => ({
  sources: state.app.get('sources'),
  asyncError: state.app.get('asyncError'),
  asyncLoading: state.app.get('asyncLoading'),
}))

export default class SourcesBar extends Component {
  static propTypes = {
    sources: PropTypes.array,
    dispatch: PropTypes.func,
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(asyncSources());
  }

  render() {
    const {
      sources,
    } = this.props;
    return (
      <div className='sources-bar'>
        <h1 className='sources-bar__title'>Sources</h1>
        <SourcesList sources={ sources } />
      </div>
    );
  }
}
