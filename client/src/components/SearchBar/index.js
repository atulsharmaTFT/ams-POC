import React, { useState } from 'react';
import classes from './SearchBar.module.scss';
import Button from '../Button/Button';
import { BiSearchAlt } from "react-icons/bi";

const SearchBar = ({searchTerm,setSearchTerm,handleSearch}) => {

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={classes.searchBar}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <Button
      icon={<BiSearchAlt size={"25px"}/>}
      overrideClassName={classes.addBtn}
      onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
