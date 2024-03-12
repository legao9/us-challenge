import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.jpeg";
import Dropdown from "../DropdownLanguage/Dropdown";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import "./Header.css";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { NavLink, Link, useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';



export default function Header() {
  const languageOptions = [
    {
      id: "en",
      name: "English",
      flagimg:
        "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg",
    },
    {
      id: "it",
      name: "Italian",
      flagimg: "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg",
    },
  ];

  return (
    <header className="header">
      <div className="top-bar flex pointer">

        <div className="ani-search">
          <SearchIcon className=""/>
          {/* <div className="search-div">
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
              <InputBase sx={{ ml: 1, flex: 1 }}
                placeholder="Search challenge"
                inputProps={{ 'aria-label': 'search google maps' }} />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div> */}
        </div>

        <div className="dropdown pointer">
          <div>
            <GTranslateIcon className=""/>
          </div>
          <div className="dropdown-content ">
            {languageOptions.map((lang) => (
              <div id={lang.id} key={lang.id}  className="dropdown-item">
                <img height="25" width="35" src={lang.flagimg}
                  alt="flagpic" id={lang.id}/>
                <div className="dropdown-name animate-bounce">{lang.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dropdown pointer">
          <div>
            <AccountCircleOutlinedIcon />
          </div>
        </div>

      </div>
      <div className="grid grid-cols-9">
        <div className="col-span-7 flex gap-8 pointer">
          <div>Social Campagins</div>
          <div>Retail Stores</div>
          <div>Bookings </div>
          <div>Models </div>
          <div>Bookings </div>
          <div>About </div>
        </div>
        <div></div>
        <div className="">
          <div className="login pointer">Login</div>
        </div>
      </div>




      {/* <div className="grid grid-rows-3 grid-flow-col">
        <div className="left">
          <Link to="/">
            <img src={logo} className="Logo" alt="logo" />
          </Link>
        </div>
        <div></div>
        <div className="">
          <div className="search"><i>sea</i></div>
          <div className=""><i>trans</i></div>
          <div className=""><i>user</i></div>
        </div>
      </div>


      <div className="grid grid-rows-6 grid-flow-row gap-1">
        <div>Social Campagins</div>
        <div>Retail Stores</div>
        <div>Bookings </div>
        <div>Models </div>
        <div>About </div>
        <div>Bookings </div>
      </div>

      <div>
        <div className="left"><h2>Upcoming Challenge</h2></div>
      </div> */}
      {/* {(!isSmallScreen || isNavVisible) && (
        <nav className="Nav">
        <Dropdown />
        <NavLink
        to="/polls"
        className={({ isActive }) => (isActive ? "header-link-active" : "")}
        >
        Polls
        </NavLink>
        
        <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "header-link-active" : "")}
            >
            Products
            </NavLink>
            {localStorage.getItem("user")=="admin" && <NavLink
            to="/admin/users"
            className={({ isActive }) => (isActive ? "header-link-active" : "")}
            >
            Users
          </NavLink>
        }
        
        {!localStorage.getItem("token") ? (
          <div>
              <NavLink
              to="/signin"
              className={({ isActive }) => (isActive ? "header-link-active" : "")}
              >
              Sign In
              </NavLink>
              <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "header-link-active" : "")}
              >
              Sign Up
              </NavLink>
              </div>) :  <div onClick={handleLogout} className=''> 
              Logout
              </div>
            }
            <LanguageSelector />
            </nav>
            )}
            <button onClick={toggleNav} className="Burger">
            dfdfdfdf
          </button> */}

    </header>
  );
}
