import React, { Component } from "react";

import { fire, database } from "../../config/firebase";

import * as FormatDate from "../../utils/FormatDate";

import * as User from "../../controllers/UserController";
import * as KeyPopup from "../../controllers/KeyPopupController";

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

      popup: false,
      popup_event: null,
      popup_event_key: '',
      popup_key_input: ''
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
    localStorage.setItem("key_is_done", 'false');
    setInterval(() => {
      var event = KeyPopup.nextEvent(this.state.events);
      if(event !== null){
        if(KeyPopup.areKeysInEvent(event)){
          var [ popup_response, event_response, event_key ] = KeyPopup.compareTime(event, this.state.popup_event);
          
          if (event_key !== this.state.popup_event_key) localStorage.setItem("key_is_done", 'true');
          
          if (!popup_response && localStorage.getItem("key_is_done") === 'false') {
              localStorage.setItem("key_is_done", 'true');
              this.setState({popup: popup_response, popup_event: event_response, popup_event_key: event_key});
          }
          
          if (popup_response && localStorage.getItem("key_is_done") === 'true') {
              localStorage.setItem("key_is_done", 'false');
              this.setState({popup: popup_response, popup_event: event_response, popup_event_key: event_key});
          }
        }
      }
    }, 1000)
  }

  handleClickKey = ev => {
    ev.preventDefault();

    var response = KeyPopup.compareKeys(this.state.popup_event, this.state.popup_key_input, this.state.popup_event_key)
    
    if(response){

      var [ messageRequest, data ] = KeyPopup.createMessageRequest(this.state.popup_event, this.state.uid, this.state.popup_event_key)

      database.ref(messageRequest).update(data);

      localStorage.setItem("key_is_done", 'false_');
    }
    
    this.setState({popup: false})
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  render() {
    return (
      <div className="home">
        <Backdrop loading={this.state.loading} />

        <Header title="Eventos" />

        {this.state.popup ? (
          <div className="popup">
            <div className="popup_text_event">
              {KeyPopup.popupText(this.state.popup_event)}   
            </div>
            <div className="popup_text">
              Informe a {this.state.popup_event_key}
            </div>
            <div className="popup_keyInput">
              <input 
                type="text"
                name="popup_key_input"
                onChange={this.handleChange}
              />
            </div>
            <div className="popup_button">
              <button 
                onClick={this.handleClickKey}
              >Ok</button>
            </div>
          </div>
        ) : null }

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
