import React from 'react';

import './search-pannel.css';

const SearchPannel = () => {
  return (
    <input type="text"
              className="form-control search-input"
              placeholder="type to search" />
  );
};

export default SearchPannel;