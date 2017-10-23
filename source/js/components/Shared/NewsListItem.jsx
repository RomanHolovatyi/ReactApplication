import React from 'react';

const NewsListItem = ({ newsItem }) => {
  // const imageUrl = source.url;
  return (
    <li onClick={ () => console.log(newsItem) } className='news-list-item'>
      <div className='news-list-item__content'>
        <div className='news-list-item__image-wrapper'>
          <img src={ newsItem.urlToImage } alt='IMAGE URL' className='news-list-item__image' />
        </div>
        <div className='news-list-item__text'>
          <a target='_blank' href={ newsItem.url }><h2 className='news-list-item__title'>{ newsItem.title }</h2></a>
          <p>{ newsItem.author }</p>
          <p>Published at { newsItem.publishedAt }</p>
        </div>
      </div>
    </li>
  );
};

export default NewsListItem;
