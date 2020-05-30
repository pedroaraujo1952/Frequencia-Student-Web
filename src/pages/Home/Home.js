import React, { Component } from "react";

import { fire, database } from "../../config/firebase";

import * as KeyPopup from "../../controllers/KeyPopupController";

import Card from "../../components/Card/Card";
import Backdrop from "../../components/Backdrop/Backdrop";
import Header from "../../components/Header/Header";
import Dialog from "../../components/KeyDialog/KeyDialog";

import HomeImg from "../../assets/home.jpg";

import "./styles.css";
import CustomSnackbar from "../../components/Snackbar/Snackbar";
import compare from "../../utils/SortEvents";

import { isTimeBetween } from "../../utils/FormatTime";
import { Redirect } from "react-router-dom";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      uid: null,
      user: null,
      events: [],
      activeEventIndex: null,
      check_order: [],

      loading: false,

      popup: false,
      popup_event: null,
      popup_event_key: "",
      popup_key_input: "",

      toast: false,
      redirect: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });

    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        const userData = localStorage.getItem("user");

        this.setState({ uid: user.uid, user: JSON.parse(userData) });

        const { classroom } = this.state.user;

        //* GET the actual date of the user machine
        const auxiliar_date = new Date().toLocaleDateString().split("/");
        auxiliar_date[2] = auxiliar_date[2].substring(0, 2);

        const today = auxiliar_date.join("-")

        //* GET Events
        const eventRef = database.ref("events");
        eventRef
          .child(today)
          .child(classroom)
          .on("value", (snap) => {
            let events = [];
            snap.forEach((event) => {
              const now = KeyPopup.timeNow();
              let isActive = false;
              let frequency = {};

              if (isTimeBetween(event.val().begin, now, event.val().end)) {
                isActive = true;
                //* GET user frequency
                const frequencyRef = database.ref("frequency");
                // console.log(event.key);
                frequencyRef
                  .child(classroom)
                  .child(event.key)
                  .child(this.state.uid)
                  .on("value", (snap) => {
                    var { interval } = this.state;

                    if (interval) {
                      clearInterval(interval);
                      interval = null;
                      this.setState({ interval });
                    }

                    //Delete the oldest event
                    if (Object.entries(frequency).length !== 0) {
                      events.shift();
                    }

                    frequency = snap.val();
                    // console.log(events);

                    let data = {
                      key: event.key,
                      frequency,
                      event: event.val(),
                      isActive,
                    };

                    events.push(data);

                    this.setState({ events: events.sort(compare) });
                  });
              } else {
                events.push({
                  key: event.key,
                  frequency,
                  event: event.val(),
                  isActive,
                });
              }
              this.setState({ events: events.sort(compare) });
            });

            // console.log(events);
            this.setState({ loading: false });
          });
      } else {
        this.setState({ redirect: true });
      }
    });
  }

  handleClickKey = (ev) => {
    ev.preventDefault();

    // console.log(this.state.popup_key_input)

    var response = KeyPopup.compareKeys(
      this.state.popup_event,
      this.state.popup_key_input,
      this.state.popup_event_key
    );

    if (response) {
      var [messageRequest, data] = KeyPopup.createMessageRequest(
        this.state.popup_event,
        this.state.uid,
        this.state.popup_event_key
      );

      database.ref(messageRequest).update(data);

      localStorage.setItem("key_is_done", "true");

      this.setState({
        popup: false,
        toastStatus: true,
        toast: {
          type: "success",
          message: "Palavra-passe inserida com sucesso",
        },
      });
    } else {
      this.setState({
        popup: false,
        toastStatus: true,
        toast: {
          type: "warning",
          message:
            "Palavra-passe inserida incorretamente, preste mais atenção na aula",
        },
      });
    }
  };

  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleCloseDialog = () => {
    this.setState({
      popup: false,
      toastStatus: true,
      toast: {
        type: "warning",
        message: "Palavra-passe não foi enviada, espere a próxima",
      },
    });
  };

  handleToastClose = () => {
    this.setState({ toastStatus: false });
  };

  render() {
    if (this.state.redirect) return <Redirect to="/signin" />;

    return (
      <div className="home">
        <Backdrop loading={this.state.loading} />

        <CustomSnackbar
          open={this.state.toastStatus}
          onClose={this.handleToastClose}
          message={this.state.toast.message}
          type={this.state.toast.type}
        />

        <Header title="Eventos" />

        <Dialog
          open={this.state.popup}
          onClose={this.handleCloseDialog}
          onChange={this.handleChange}
          onSubmit={this.handleClickKey}
          keywordNumber={this.state.popup_event_key}
          // error={this.state.popup}
        />

        <div className="events">
          {this.state.events.length > 0 ? (
            this.state.events.map((event, index) => (
              <Card
                key={index}
                index={index}
                events={this.state.events}
                uid={this.state.uid}
                check={this.state.check_order[index]}
                classroom={this.state.user.classroom}
              />
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
