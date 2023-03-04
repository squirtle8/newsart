import React from 'react';

const SearchBar = () => {

  return (
    <>
      <section>
        <form>
          <input 
            type='text'
            placeholder='Search keyword...'
            value={searchString}
            onChange={changeSearchString}
          />
        </form>
      </section>
    </>
  );
}

export default SearchBar;
