import React, { Component } from 'react';

import Menu from 'components/Global/Menu';
import SourcesBar from 'components/Global/SourcesBar';
import NewsBar from 'components/Global/NewsBar';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        {/* <Menu /> */}
        <div className='app-content'>
          <SourcesBar />
          <NewsBar />
        </div>
      </div>
    );
  }
}
