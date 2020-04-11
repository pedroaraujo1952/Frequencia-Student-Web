import React from "react";

import Logo from "../../assets/logo.png";

import "./styles.css";

const Header = ({ title }) => (
  <div className="header">
    <header>
      <img src={Logo} alt="" />
      <h1>{title}</h1>
    </header>
  </div>
);

export default Header;
