// src/App.js
import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import GroupSelector from './components/GroupSelector';
import SortSelector from './components/SortSelector';
import NavBar from './components/NavBar';
import './App.css';


function App() {
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  return (
    <div className="App">
       <NavBar/>
      {/* <h1>Kanban Board</h1> */}
      {/* <GroupSelector setGroupBy={setGroupBy} /> */}
      {/* <SortSelector setSortBy={setSortBy} /> */}
      <KanbanBoard groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
}
export default App;