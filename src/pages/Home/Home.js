import React, { Component } from "react";

import { fire, database } from "../../config/firebase";

import * as FormatDate from "../../utils/FormatDate";

import * as User from "../../controllers/UserController";
import * as KeyPopup from "../../controllers/KeyPopupController";

import Card from "../../components/Card/Card";
import Backdrop from "../../components/Backdrop/Backdrop";
import Header from "../../components/Header/Header";
import Dialog from "../../components/KeyDialog/Dialog";

import HomeImg from "../../assets/home.jpg";

import "./styles.css";
import CustomSnackbar from "../../components/Snackbar/Snackbar";
import compare from "../../utils/SortEvents";
import { Redirect } from "react-router-dom";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      uid: null,
      user: null,
      events: "",
      check_order: [],

      loading: false,

      popup: false,
      popup_event: null,
      popup_event_key: "",
      popup_key_input: "",

      toast: false,
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

    if (!this.state.user.test_done) {
      this.setState({ loading: false, vocational_test: true });

      return;
    }

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
          this.setState({ events: events.sort(compare), loading: false });
        });
      }
    });

    //Key validation
    localStorage.setItem("key_is_done", "false");
    setInterval(() => {
      var [event, check_order, is_check] = KeyPopup.nextEvent(
        this.state.events
      );
      this.setState({ check_order });
      if (event !== null) {
        if (KeyPopup.areKeysInEvent(event)) {
          var [
            popup_response,
            event_response,
            event_key,
          ] = KeyPopup.compareTime(event, is_check);

          if (event_key !== this.state.popup_event_key)
            localStorage.setItem("key_is_done", "true");

          if (
            !popup_response &&
            localStorage.getItem("key_is_done") === "false"
          ) {
            localStorage.setItem("key_is_done", "true");
            this.setState({
              popup: popup_response,
              popup_event: event_response,
              popup_event_key: event_key,
            });
          }

          if (
            popup_response &&
            localStorage.getItem("key_is_done") === "true"
          ) {
            localStorage.setItem("key_is_done", "false");
            this.setState({
              popup: popup_response,
              popup_event: event_response,
              popup_event_key: event_key,
            });
          }
        }
      }
    }, 1000);
  }

  handleClickKey = (ev) => {
    ev.preventDefault();

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

      localStorage.setItem("key_is_done", "false_");

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
    if (this.state.vocational_test) return <Redirect to={{ pathname: "/test", state: {user: this.state.user}}}/>;

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
