import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header text-white flex items-center justify-center gap-x-5 py-10">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/movie"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Movie
      </NavLink>
    </div>
  );
};

export default Header;
