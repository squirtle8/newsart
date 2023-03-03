import React from 'react';

export default SearchBar = () => {

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