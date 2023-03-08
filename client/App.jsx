import React, { useState, useEffect } from 'react';

import SearchBar from './components/SearchBar.jsx';
import MainContainer from './components/MainContainer.jsx';


export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [cards, setCards] = useState([]);

  console.log("searchText in app", searchText)

  return (
    <>
      <div>
        <h1>newsart</h1>
      </div>
      <div>
        <SearchBar setSearchText={setSearchText} />
      </div>
      <div>
        <MainContainer searchText={searchText} cards={cards} setCards={setCards} />
      </div>
      
    </>
  );
};