import React, { useState } from 'react';
import {
  SearchForm,
  ButtonSearch,
  ButtonSearchLabel,
  SearchBar,
  InputSearch,
} from './Searchbar.styled';

const Searchbar = ({ handleSetQuery }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChangeSearchInput = e => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleSearchFormSubmit = e => {
    e.preventDefault();
    if (searchValue) {
      handleSetQuery(searchValue);
      setSearchValue('');
    }
    return;
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSearchFormSubmit}>
        <ButtonSearch type="submit">
          <ButtonSearchLabel>Search</ButtonSearchLabel>
        </ButtonSearch>

        <InputSearch
          type="text"
          name="searchValue"
          value={searchValue}
          onChange={handleChangeSearchInput}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchBar>
  );
};
export default Searchbar;
