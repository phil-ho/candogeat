import React from 'react';
import styled from 'styled-components';

import SearchBar from '../SearchBar';

const App = () => {

  const Hello = styled.h1`
    font-family: Arial, Helvetica, sans-serif;
    color: rgb(62, 89, 212);
  `;

  return (
    <div className="App">
      <Hello>hello</Hello>
      <SearchBar />
    </div>
  );
};

export default App;
