import React from "react";

import { NavLink } from "react-router-dom";

import Logo from "../../assets/logo.png";

import Info from "../../assets/info_icon.png";

import Back from "../../assets/back_icon.png";

import "./styles.css";

const Header = ({ title }) => (
  <div className="header">
    <header>
      { title === "Sobre Nós" ?
        <NavLink to="/" className="alternative">
          <img src={Back} id="back" alt="Back to Home Screen"  />
        </NavLink>
        :
        <br/>
      }
      <img src={Logo} alt="" />
      <h1>{title}</h1>
      { title === "Eventos" ?
        <NavLink to="/about" className="alternative">
          <img src={Info} id="info" alt="About Us" />
        </NavLink>
        :
        <br/>
      }
    </header>
  </div>
);

export default Header;
