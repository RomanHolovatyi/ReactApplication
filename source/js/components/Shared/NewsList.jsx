import React from 'react';
import NewsListItem from './NewsListItem.jsx';

const SourcesList = (props) => {
  if (props.error !== null) {
    return (
      <div className='error-category'>Unsupported category</div>
    );
  }

  if (props.news === null) {
    return (
      <div>Empty</div>
    );
  }

  const newsItems = props.news.map((news, index) => {
    return (
      <NewsListItem
        key={ index }
        newsItem={ news }
      />
    );
  });

  return (
    <ul className='news-list'>
      {newsItems}
    </ul>
  );
};

export default SourcesList;
