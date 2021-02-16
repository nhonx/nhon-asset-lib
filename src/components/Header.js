import React, { Component } from "react";

const Header = () => {
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-left">
          <a className="nav-item">
            {" "}
            <b>NHONDINH</b>{" "}
          </a>
        </div>

        <label htmlFor="menu-toggle" className="nav-toggle">
          <span></span> <span></span> <span></span>
        </label>
        <input type="checkbox" id="menu-toggle" className="is-hidden" />

        <div className="nav-right nav-menu">
          <a className="nav-item"> Help </a> <a className="nav-item"> About </a>
        </div>
      </div>
    </nav>
  );
};
export default Header
