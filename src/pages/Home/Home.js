import React, { Component } from "react";

import { fire, database } from "../../config/firebase";

import * as FormatDate from "../../utils/FormatDate";

import * as User from "../../controllers/UserController";

import Card from "../../components/Card/Card";
import Backdrop from "../../components/Backdrop/Backdrop";
import Header from "../../components/Header/Header";

import HomeImg from "../../assets/home.jpg";

import "./styles.css";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      uid: null,
      user: null,
      events: "",

      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });

    if (!(await fire.auth().currentUser)) {
      const uid = localStorage.getItem("uid");
      this.setState({ uid });
    } else {
      const uid = await fire.auth().currentUser.uid;
      this.setState({ uid });
    }

    this.setState({ user: await User.getUser(this.state.uid) });

    //GET Events
    const { turma } = await User.getUser(this.state.uid);

    const rootRef = database.ref("professores");
    rootRef.on("value", (snap) => {
      let events = [];

      if (snap) {
        snap.forEach((data) => {
          const teacher = data;
          const teacherEvents = teacher.child("events").child(turma);

          if (teacherEvents.val()) {
            const fullDate = FormatDate.formatDate();

            teacherEvents.forEach((event) => {
              if (
                event.key !== "evento0" &&
                event.child("date").val() === fullDate
              ) {
                let checkin = event
                    .child("students")
                    .child(this.state.uid)
                    .child("checkin")
                    .val(),
                  checkout = event
                    .child("students")
                    .child(this.state.uid)
                    .child("checkout")
                    .val(),
                  teacherUID = data.key;

                const eventData = {
                  ...event.val(),
                  eventID: event.key,
                  teacherUID,
                  turma,
                  checkin,
                  checkout,
                };

                events.push(eventData);
              }
            });
          }
        });
        this.setState({ events, loading: false });
      }
    });
  }

  render() {
    return (
      <div className="home">
        <Backdrop loading={this.state.loading} />

        <Header title="Eventos" />

        <div className="events">
          {this.state.events.length > 0 ? (
            this.state.events.map((event, index) => (
              <Card key={index} event={event} uid={this.state.uid} />
            ))
          ) : (
            <div className="noEvent card">
              <p>
                Não temos nenhum evento no momento, aguarde a publicação pelo(a)
                professor(a).
              </p>
              <div>
                <img src={HomeImg} alt="" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
