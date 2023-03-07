import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';


const GET_BY_KEYWORD = gql`
  query GetByKeyword {
    news {
      title
      desc
      link
      image
    }
  }
`;

const SearchBar = ({ searchText, setSearchText }) => {

  const submit = async(e) => {
    e.preventDefault();
    if (!searchText) return;

    const { loading, error, data } = useQuery(GET_BY_KEYWORD, { errorPolicy: "all" });

    if (loading) return <p>Loading...</p>;
    if (error) console.log(JSON.stringify(error, null, 2));
    setCards(data.news);
  }

  return (
    <>
      <form>
        <TextField
          onInput={e => {
            setSearchText(e.target.value);
          }}
          variant="outlined"
          search="Search headlines..."
          size="small"
        />
        <IconButton type="submit" aria-label="search" onClick={submit}>
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </form>
    </>
  );
}

export default SearchBar;
