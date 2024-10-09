// src/components/SortSelector.js
import React from 'react';

const SortSelector = ({ setSortBy }) => {
  return (
    <div>
      <button onClick={() => setSortBy('priority')}>Sort by Priority</button>
      <button onClick={() => setSortBy('title')}>Sort by Title</button>
    </div>
  );
};

export default SortSelector;
