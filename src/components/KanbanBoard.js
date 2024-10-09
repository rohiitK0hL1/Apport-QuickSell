// src/components/KanbanBoard.js
import React, { useState, useEffect } from 'react';
import { fetchData } from '../api'; // Ensure this path is correct
import './KanbanBoard.css'; // Make sure this CSS file exists
import NavBar from './NavBar';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status'); // Set initial grouping
  const [sortBy, setSortBy] = useState('priority'); // Set initial sorting

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  const groupTickets = () => {
    // Grouping logic remains unchanged
    if (groupBy === 'status') {
      return tickets.reduce((acc, ticket) => {
        if (!acc[ticket.status]) acc[ticket.status] = [];
        acc[ticket.status].push(ticket);
        return acc;
      }, {});
    } else if (groupBy === 'user') {
      return tickets.reduce((acc, ticket) => {
        const user = users.find(user => user.id === ticket.userId)?.name;
        if (!acc[user]) acc[user] = [];
        acc[user].push(ticket);
        return acc;
      }, {});
    } else if (groupBy === 'priority') {
      return tickets.reduce((acc, ticket) => {
        if (!acc[ticket.priority]) acc[ticket.priority] = [];
        acc[ticket.priority].push(ticket);
        return acc;
      }, {});
    }
  };

  const sortedTickets = (group) => {
    if (sortBy === 'priority') {
      return group.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      return group.sort((a, b) => a.title.localeCompare(b.title));
    }
    return group;
  };

  const groupedTickets = groupTickets();

  return (
    <div className="kanban-container">
      <div className="kanban-header"> 
        <h1>Kanban Board</h1>
      </div>
      <div className="kanban-filters">
        <button onClick={() => setGroupBy('status')}>Group By Status</button>
        <button onClick={() => setGroupBy('user')}>Group By User</button>
        <button onClick={() => setGroupBy('priority')}>Group By Priority</button>
      </div>
      <div className="kanban-columns">
        {Object.keys(groupedTickets).map(group => (
          <div key={group} className="kanban-column">
            <h2>{group}</h2>
            {sortedTickets(groupedTickets[group]).map(ticket => (
              <div key={ticket.id} className="ticket">
                <h4>{ticket.title}</h4>
                <p>Status: {ticket.status}</p>
                <p>Priority: {ticket.priority}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

