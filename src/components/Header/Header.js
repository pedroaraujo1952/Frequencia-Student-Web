import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import { fire } from "../../config/firebase";

import Logo from "../../assets/logo.png";
import Back from "../../assets/back_icon.png";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import "./styles.css";
import { Dialog, List, ListItem } from "@material-ui/core";

const Header = ({ title }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("uid");

    if (fire.auth().currentUser) {
      fire.auth().signOut();
    }

    window.location.reload();
    handleClose();
  };

  return (
    <div className="header">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <List>
          <ListItem>
            <NavLink to="/about" className="info">
              <button onClick={handleClose} className="dialogButton">
                Sobre nós
              </button>
            </NavLink>
          </ListItem>
          <ListItem>
            <button
              onClick={handleLogout}
              className="dialogButton"
              style={{ background: "#043f5f" }}
            >
              Log out
            </button>
          </ListItem>
        </List>
      </Dialog>

      <header>
        {title === "Sobre Nós" ? (
          <NavLink to="/" className="back">
            <img src={Back} id="back" alt="Back to Home Screen" />
          </NavLink>
        ) : (
          <br />
        )}
        <img src={Logo} alt="" />
        <h1>{title}</h1>
        {title === "Eventos" ? (
          <div className="options">
            <MoreVertIcon style={{ fontSize: 40 }} onClick={handleClickOpen} />
          </div>
        ) : (
          <br />
        )}
      </header>
    </div>
  );
};

export default Header;
