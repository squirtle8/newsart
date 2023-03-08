import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

const SearchBar = ({ setSearchText }) => {

  const [value, setValue] = useState('')

  const submit = async(e) => {
    e.preventDefault();
    console.log("current search value", value)
    setSearchText(value);
  }

  return (
    <>
      <form>
        <TextField
          onInput={e => {
            setValue(e.target.value);
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
