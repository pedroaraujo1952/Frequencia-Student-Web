import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import * as Session from "../../controllers/SessionController";

import Header from "../../components/Header/Header";
import MaterialSelect from "../../components/MaterialSelect/MaterialSelect";

import Error from "../../errors/user.error";

import "./styles.css";
import Backdrop from "../../components/Backdrop/Backdrop";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      nameError: "",

      classroom: "",
      classroomError: "",

      ra: "",
      raError: "",

      email: "",
      emailError: "",

      pswd: "",
      pswdError: "",

      confirmPswd: "",
      confirmPswdError: "",

      loading: false,
      signup: false,
    };
  }

  handlePassword = (password, confirmPassword) => {
    if (password === confirmPassword) return true;
    else return false;
  };

  handleEmpty = ({ name, classroom, ra, email, pswd, confirmPswd }) => {
    if (!name) {
      this.setState({ nameError: "Preencha todos os campos" });
      return false;
    } else if (!classroom) {
      this.setState({ classroomError: "Preencha todos os campos" });
      return false;
    } else if (!ra) {
      this.setState({ raError: "Preencha todos os campos" });
      return false;
    } else if (ra.length > 6) {
      this.setState({ raError: "Insira um RA válido" });
      return false;
    } else if (!email) {
      this.setState({ emailError: "Preencha todos os campos" });
      return false;
    } else if (!pswd) {
      this.setState({ pswdError: "Preencha todos os campos" });
      return false;
    } else if (!confirmPswd) {
      this.setState({ confirmPswdError: "Preencha todos os campos" });
      return false;
    }

    return true;
  };

  handleSubmit = async (ev) => {
    ev.preventDefault();

    this.setState({ loading: true });

    if (this.handleEmpty(this.state)) {
      const { pswd, confirmPswd } = this.state;

      if (this.handlePassword(pswd, confirmPswd)) {
        await Session.signUp(this.state).then(
          (stats) => {
            this.setState({ loading: false, signup: stats });
          },
          (error) => {
            if (error.type === "EMAIL_ERROR")
              this.setState({
                loading: false,
                emailError: error.message,
                pswdError: "",
                pswdConfirmError: "",
              });
            else if (error.type === "PSWD_ERROR")
              this.setState({
                loading: false,
                pswdError: error.message,
                pswdConfirmError: error.message,
                emailError: "",
              });
            else {
              this.setState({
                loading: false,
                pswdError: "",
                emailError: "",
                pswdConfirmError: "",
              });
              alert(error.message);
            }
            this.setState({ loading: false });
          }
        );
      } else {
        const error = {
          code: "auth/wrong-confirm-password",
        };
        const ERROR = new Error(error);
        this.setState({ confirmPswdError: ERROR.getError.message });
      }
    }
  };

  handleChange = (ev) => {
    if (ev.target.name === "ra") {
      if (ev.target.value.length <= 6) {
        this.setState({
          [ev.target.name]: ev.target.value,
          nameError: "",
          raError: "",
          emailError: "",
          classroomError: "",
          pswdError: "",
          confirmPswdError: "",
        });
      }
    } else {
      this.setState({
        [ev.target.name]: ev.target.value,
        nameError: "",
        raError: "",
        emailError: "",
        classroomError: "",
        pswdError: "",
        confirmPswdError: "",
      });
    }
  };

  render() {
    if (this.state.signup) return <Redirect to="/" />;

    return (
      <div className="signup">
        <Backdrop loading={this.state.loading} />

        <form>
          <Header title="CADASTRO" />

          <div className="contents">
            <div className="field">
              <p>Nome</p>
              <input type="text" name="name" onChange={this.handleChange} />
              <p className="error">{this.state.nameError}</p>
            </div>

            <div className="field">
              <p>Turma</p>
              <MaterialSelect
                name="classroom"
                onChange={this.handleChange}
                value={this.state.classroom}
              />
              <p className="error">{this.state.classroomError}</p>
            </div>

            <div className="field">
              <p>RA</p>
              <input
                type="number"
                name="ra"
                onChange={this.handleChange}
                value={this.state.ra}
              />
              <p className="error">{this.state.raError}</p>
            </div>

            <div className="field">
              <p>Email</p>
              <input type="email" name="email" onChange={this.handleChange} />
              <p className="error">{this.state.emailError}</p>
            </div>

            <div className="field">
              <p>Senha</p>
              <input type="password" name="pswd" onChange={this.handleChange} />
              <p className="error">{this.state.pswdError}</p>
            </div>

            <div className="field">
              <p>Confirmar Senha</p>
              <input
                type="password"
                name="confirmPswd"
                onChange={this.handleChange}
              />
              <p className="error">{this.state.confirmPswdError}</p>
            </div>

            <div className="buttonGroup field">
              <button onClick={this.handleSubmit}>CADASTRAR</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
