import React, { useState } from 'react';
import debounce from 'lodash/debounce'; 
import "../css/Search_bar.css"

const Search_Bar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = debounce(() => {
    onSearch(searchTerm);
  }, 10); 

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    handleSearch();
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Căutare.."
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="button" onClick={handleSearch}>
        Caută
      </button>
    </div>
  );
};

export default Search_Bar;
