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

    const { event } = this.state;
    let user = event.students[this.state.uid];
    user.checkin = time;
    event.students[this.state.uid] = user;

    const data = {
      begin: event.begin,
      date: event.date,
      description: event.description,
      end: event.end,
      keys: event.keys,
      link: event.link,
      students: event.students,
      subject: event.subject,
      title: event.title,
    };

    const rootRef = database.ref("professores");
    const eventRef = rootRef
      .child(event.teacherUID)
      .child("events")
      .child(event.turma)
      .child(event.eventID);

    await eventRef.set(data);

    this.setState({ checkin: time });
  };

  handleCheckout = async (ev) => {
    ev.preventDefault();

    var today = new Date();
    var time = today.getHours() + "h" + today.getMinutes();

    const { event } = this.state;
    let user = event.students[this.state.uid];
    user.checkout = time;
    event.students[this.state.uid] = user;

    const data = {
      begin: event.begin,
      date: event.date,
      description: event.description,
      end: event.end,
      keys: event.keys,
      link: event.link,
      students: event.students,
      subject: event.subject,
      title: event.title,
    };

    const rootRef = database.ref("professores");
    const eventRef = rootRef
      .child(event.teacherUID)
      .child("events")
      .child(event.turma)
      .child(event.eventID);

    await eventRef.set(data);

    this.setState({ checkout: time });
  };

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
            <p>Inicio: {this.state.event.begin}</p>
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
      </div>
    );
  }
}
