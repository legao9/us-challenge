// Dropdown.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Dropdown.css";

const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown" onClick={handleDropdownToggle}>
    {/*Condition for Rolemanagement: We are checking if user type is admin only render button if user is admin*/}
    {localStorage.getItem("user")=="admin"&& <button className="dropbtn">Add New +</button>}
      
      <div className={`dropdown-content ${isDropdownOpen ? "open" : ""}`}>
        <NavLink
          to="/create-poll"
          className={({ isActive }) => (isActive ? "header-link-active" : "")}
        >
          Create Polls
        </NavLink>
        <NavLink
        to="/create-challenge"
        className={({ isActive }) => (isActive ? "header-link-active" : "")}
      >
        Create Challenges

        
      </NavLink>
      </div>
    </div>
  );
};

export default Dropdown;
