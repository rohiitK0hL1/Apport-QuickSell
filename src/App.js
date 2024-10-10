import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Board from "./components/Board/Board";
import { status, priorities } from "./utils/data";

function App() {
  // State for tickets and users data
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  // Default values for group and order from local storage
  const defaultGroup = localStorage.getItem("selectedGroup");
  const defaultOrder = localStorage.getItem("selectedOrder");

  // State for group and order
  const [group, setGroup] = useState(defaultGroup || "status");
  const [order, setOrder] = useState(defaultOrder || "priority");

  // Handle change in grouping
  const handleGroupChange = (groupSelected) => {
    setGroup(groupSelected);
    localStorage.setItem("selectedGroup", groupSelected);
  };

  // Handle change in ordering
  const handleOrderChange = (orderSelected) => {
    setOrder(orderSelected);
    localStorage.setItem("selectedOrder", orderSelected);
  };

  // Fetching data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch function to get ticket and user data
  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const data = await res.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App scroll-container">
      {/* Navbar component to handle group and order selection */}
      <Navbar
        group={group}
        order={order}
        onGroupchange={handleGroupChange}
        onOrderChange={handleOrderChange}
      />

      {/* Boards container */}
      <div className="boards_container">
        <div className="app_boards">
          {/* Display boards based on group type */}
          {group === "status" &&
            status.map((opt, id) => (
              <Board
                order={order}
                data={opt}
                key={id}
                tickets={tickets}
                users={users}
                group={group}
              />
            ))}
          {group === "user" &&
            users.map((opt) => (
              <Board
                order={order}
                data={opt}
                key={opt.id}
                tickets={tickets}
                users={users}
                group={group}
                userId={opt?.id}
              />
            ))}
          {group === "priority" &&
            priorities.map((opt, id) => (
              <Board
                order={order}
                data={opt}
                level={id}
                key={id}
                tickets={tickets}
                users={users}
                group={group}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
