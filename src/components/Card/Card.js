import React, { Component } from "react";

import { database } from "../../config/firebase";

import Tv from "../../assets/tv.png";

import "./styles.css";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.uid,
      event: this.props.event,
      checkin: this.props.event.checkin,
      checkout: this.props.event.checkout,
    };
  }

  handleCheckin = async (ev) => {
    ev.preventDefault();

    var today = new Date();
    var time = today.getHours() + "h" + today.getMinutes();

    const data = {
      checkin: time
    };

    this.handleSend(data)

    this.setState({ checkin: time });
  };

  handleCheckout = async (ev) => {
    ev.preventDefault();

    var today = new Date();
    var time = today.getHours() + "h" + today.getMinutes();

    const data = {
      checkout: time
    };

    this.handleSend(data)

    this.setState({ checkout: time });
  };

  handleSend = (data) => {
    var messageRequest = `professores/${this.state.event.teacherUID}/events/${this.state.event.turma}/${this.state.event.eventID}/students/${this.state.uid}`;
    database.ref(messageRequest).update(data);
  }

  render() {
    return (
      <div className="card">
        <header>
          <p
            style={{
              textAlign: "left",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {this.state.event.title}
          </p>
          <p
            className="subtitle"
            style={{
              textAlign: "right",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {this.state.event.subject}
          </p>
        </header>

        <div className="content">
          <div>
            <p>Início: {this.state.event.begin}</p>
            <p>Fim: {this.state.event.end}</p>
          </div>
          <div style={{ width: "75px" }}>
            <a
              href={this.state.event.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="center">
                <img src={Tv} alt="Hangouts" />
              </div>
              <p
                className="subtitle"
                style={{ width: "75px", margin: "0 auto" }}
              >
                Ir para live
              </p>
            </a>
          </div>
        </div>

        <div className="buttonGroup">
          <button
            onClick={this.handleCheckin}
            disabled={this.state.checkin ? true : false}
          >
            CHECK IN
          </button>
          <button
            onClick={this.handleCheckout}
            disabled={!this.state.checkin || this.state.checkout ? true : false}
          >
            CHECK OUT
          </button>
        </div>

        <div className="caption">
          <p>
            {this.state.checkin
              ? `Check in realizado às ${this.state.checkin}`
              : ""}
          </p>
          <p>
            {this.state.checkout
              ? `Check out realizado às ${this.state.checkout}`
              : ""}
          </p>
        </div>
      </div>
    );
  }
}
