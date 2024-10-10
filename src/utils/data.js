import { BsThreeDots, BsFillInfoSquareFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark, FaRegCircle } from "react-icons/fa6";
import { TbCircleDotted } from "react-icons/tb";
import { RxHalf2 } from "react-icons/rx";
import { GiNetworkBars } from "react-icons/gi";

// Array of background colors for random selection
const bgColors = ["#B57136", "#868728", "#4D9446", "#5F80E4"];

// Priority levels with corresponding icons and colors
export const priorities = [
  { title: "no priority", color: "gray", icon: <BsThreeDots /> },
  { title: "low", color: "lightgray", icon: <GiNetworkBars /> },
  { title: "medium", color: "gray", icon: <GiNetworkBars /> },
  { title: "high", color: "black", icon: <GiNetworkBars /> },
  { title: "urgent", color: "orange", icon: <BsFillInfoSquareFill /> },
];

// Status levels with icons and colors
export const status = [
  { title: "backlog", color: "black", icon: <TbCircleDotted /> },
  { title: "todo", color: "lightgrey", icon: <FaRegCircle /> },
  { title: "in progress", color: "#EBCB62", icon: <RxHalf2 /> },
  { title: "done", color: "#606ACB", icon: <FaCheckCircle /> },
  { title: "cancelled", color: "gray", icon: <FaCircleXmark /> },
];

// Status icons mapped to corresponding status levels
export const statusIcons = {
  backlog: { color: "black", icon: <TbCircleDotted /> },
  todo: { color: "lightgrey", icon: <FaRegCircle /> },
  "in progress": { color: "#EBCB62", icon: <RxHalf2 /> },
  done: { color: "#606ACB", icon: <FaCheckCircle /> },
  cancelled: { color: "gray", icon: <FaCircleXmark /> },
};

// Function to generate initials from a name
export const generateIntials = (name) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join(""); // Renamed variable for subtle change
  return initials;
};

// Function to get a random background color from predefined options
export const getRandomColor = () => {
  const randomIdx = Math.floor(Math.random() * bgColors.length);
  return bgColors[randomIdx];
};
