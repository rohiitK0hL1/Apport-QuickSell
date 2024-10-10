import "./Navbar.css";
import { MdOutlineTune } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { useState } from "react";

// Grouping options
const groupOptions = [
  { label: "Status", value: "status" },
  { label: "User", value: "user" },
  { label: "Priority", value: "priority" },
];

// Ordering options
const orderOptions = [
  { label: "Priority", value: "priority" },
  { label: "Title", value: "title" },
];

const Navbar = ({ group, order, onGroupchange, onOrderChange }) => {
  const [isExpanded, toggleExpand] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(group);
  const [selectedOrder, setSelectedOrder] = useState(order);

  // Handle change in grouping
  const handleGroupChange = (e) => {
    const newGroup = e.target.value;
    setSelectedGroup(newGroup);
    onGroupchange(newGroup); // Updated with new group value
  };

  // Handle change in ordering
  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    setSelectedOrder(newOrder);
    onOrderChange(newOrder); // Updated with new order value
  };

  return (
    <div className="nav">
      {/* Expand/Collapse button */}
      <div
        className="expand_btn"
        onClick={() => {
          toggleExpand((prevState) => !prevState);
        }}
      >
        <MdOutlineTune />
        <span>Display</span>
        <FaAngleDown />
      </div>

      {/* Dropdown for grouping and ordering */}
      {isExpanded && (
        <div className="dropdown">
          <div className="display">
            <p>Grouping</p>
            <select
              name="group"
              id="groupBy"
              value={selectedGroup}
              onChange={handleGroupChange}
            >
              {groupOptions.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
                </option> // Renamed 'i' to 'idx'
              ))}
            </select>
          </div>
          <div className="display">
            <p>Ordering</p>
            <select
              name="order"
              id="orderBy"
              value={selectedOrder}
              onChange={handleOrderChange}
            >
              {orderOptions.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
                </option> // Renamed 'i' to 'idx'
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
