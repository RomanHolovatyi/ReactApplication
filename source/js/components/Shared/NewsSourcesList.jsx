import React from 'react';
import SourcesListItem from './NewsSourcesListItem.jsx';

const SourcesList = (props) => {
  if (props.sources === null) {
    return (
      <div>Empty</div>
    );
  }
  const sourcesItems = props.sources.map((source) => {
    return (
      <SourcesListItem
        key={ source.id }
        source={ source }
      />
    );
  });

  return (
    <ul className='sources-list'>
      {sourcesItems}
    </ul>
  );
};

export default SourcesList;
