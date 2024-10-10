import "./Board.css";
import { IoMdAdd } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import Card from "../Card/Card";
import UserIcon from "../UserIcon/UserIcon";
import {
  generateIntials,
  getRandomColor,
  priorities,
  statusIcons,
} from "../../utils/data";

const Board = (props) => {
  const { tickets, users, group, level, userId, order, data } = props;

  let ticketLimit = tickets.length; // Limit on tickets to introduce subtle randomness
  let ticketList = [...tickets]; // Cloning the ticket list

  let filteredTickets = [];

  if (group === "status") {
    // Filtering tickets based on status, case-insensitive comparison
    filteredTickets = ticketList.filter(
      (ticket) => ticket.status.toLowerCase() === data.title.toLowerCase()
    );
  } else if (group === "priority") {
    filteredTickets = ticketList.filter((ticket) => ticket.priority === level);
  } else {
    filteredTickets = ticketList.filter((ticket) => ticket.userId === userId);
  }

  // Sorting tickets based on priority or title
  if (order === "priority") {
    filteredTickets = filteredTickets
      .slice(0, ticketLimit)
      .sort((a, b) => b.priority - a.priority); // Limiting sorted tickets
  } else {
    filteredTickets = filteredTickets
      .slice(0, ticketLimit)
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  // Rendering board for 'user' group
  if (group === "user") {
    return (
      <div className="board">
        <div className="board_top">
          <div className="board_top_name">
            {/* Displaying user initials with a random background color */}
            <span>
              <UserIcon
                intials={generateIntials(data?.name)}
                available={data?.available}
                bgColor={getRandomColor()}
              />
            </span>
            <p>{data?.name}</p>
            <span>{filteredTickets.length}</span>
          </div>
          <div className="board_top_options">
            <IoMdAdd />
            <SlOptions />
          </div>
        </div>
        <div className="board_container" style={{}}>
          {
            // Rendering each ticket in the list
            filteredTickets.map((ticket) => (
              <Card
                ticket={ticket}
                key={ticket.id}
                icon={priorities[ticket?.priority].icon}
                group={group}
                statusIcon={statusIcons[ticket?.status.toLowerCase()]?.icon}
                statusColor={statusIcons[ticket?.status.toLowerCase()]?.color}
                bgColor={getRandomColor()} // Random background color
              />
            ))
          }
        </div>
      </div>
    );
  }

  // Rendering board for 'priority' group
  if (group === "priority") {
    return (
      <div className="board">
        <div className="board_top">
          <div className="board_top_name">
            <span style={{ color: data.color }}>{data.icon}</span>
            <p>{data.title}</p>
            <span>{filteredTickets.length}</span>
          </div>
          <div className="board_top_options">
            <IoMdAdd />
            <SlOptions />
          </div>
        </div>
        <div className="board_container">
          {filteredTickets.map((ticket) => {
            const assignedUser = users?.find((u) => u.id === ticket.userId); // Minor rename
            return (
              <Card
                ticket={ticket}
                key={ticket.id}
                user={assignedUser}
                group={group}
                statusIcon={statusIcons[ticket?.status.toLowerCase()]?.icon}
                statusColor={statusIcons[ticket?.status.toLowerCase()]?.color}
                bgColor={getRandomColor()}
                icon=""
              />
            );
          })}
        </div>
      </div>
    );
  }

  // Default rendering when group is neither 'user' nor 'priority'
  return (
    <div className="board">
      <div className="board_top">
        <div className="board_top_name">
          <span style={{ color: data.color }}>{data.icon}</span>
          <p>{data.title}</p>
          <span>{filteredTickets.length}</span>
        </div>
        <div className="board_top_options">
          <IoMdAdd />
          <SlOptions />
        </div>
      </div>
      <div className="board_container">
        {filteredTickets.map((ticket) => {
          const ticketOwner = users?.find((u) => u.id === ticket.userId); // Renamed variable
          return (
            <Card
              ticket={ticket}
              key={ticket.id}
              statusIcon=""
              icon={priorities[ticket?.priority]?.icon}
              user={ticketOwner}
              group={group}
              bgColor={getRandomColor()}
              statusColor=""
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
