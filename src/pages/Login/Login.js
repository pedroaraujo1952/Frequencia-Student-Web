import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import * as Session from "../../controllers/SessionController";

import Backdrop from "../../components/Backdrop/Backdrop";
import Dialog from "../../components/Dialog/Dialog";
import Snackbar from "../../components/Snackbar/Snackbar";

import Logo from "../../assets/Freq.png";

import "./styles.css";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      emailError: "",

      pswd: "",
      pswdError: "",

      forgotPswd: "",
      forgotPswdError: "",

      loading: false,
      forgotPswdStatus: false,

      toast: false,
    };
  }

  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleLogin = async (ev) => {
    ev.preventDefault();

    this.setState({ loading: true });

    const { email, pswd } = this.state;

    await Session.login(email, pswd).then(
      (uid) => {
        localStorage.setItem("uid", uid);
        this.setState({ loading: false, loginStatus: true });
      },
      (error) => {
        if (error.type === "EMAIL_ERROR")
          this.setState({
            loading: false,
            emailError: error.message,
            pswdError: "",
          });
        else if (error.type === "PSWD_ERROR")
          this.setState({
            loading: false,
            pswdError: error.message,
            emailError: "",
          });
        else {
          this.setState({
            loading: false,
            pswdError: "",
            emailError: "",
          });
          alert(error.message);
        }
        this.setState({ loading: false });
      }
    );
  };

  handleDialog = () => {
    this.setState({ forgotPswdStatus: true });
  };

  handleCloseDialog = () => {
    this.setState({ forgotPswdStatus: false });
  };

  handleSubmitDialog = async () => {
    const { forgotPswd } = this.state;

    await Session.forgotPassword(forgotPswd).then(
      (message) => {
        this.setState({
          forgotPswdStatus: false,
          forgotPswdError: "",
          toastStatus: true,
          toast: {
            type: "success",
            message: message,
          },
        });
      },
      (error) => {
        if (error.type === "EMAIL_ERROR")
          this.setState({
            forgotPswdError: error.message,
          });
        else {
          alert(error.message);
          this.setState({
            toastStatus: true,
            toast: {
              type: "error",
              message: "Erro ao enviar o email",
            },
          });
        }
      }
    );
  };

  handleToastClose = () => {
    this.setState({ toastStatus: false });
  };

  render() {
    if (this.state.loginStatus) return <Redirect to="/" />;

    return (
      <div className="login">
        <Backdrop loading={this.state.loading} />
        <Dialog
          open={this.state.forgotPswdStatus}
          onClose={this.handleCloseDialog}
          onChange={this.handleChange}
          onSubmit={this.handleSubmitDialog}
          error={this.state.forgotPswdError}
        />
        <Snackbar
          open={this.state.toastStatus}
          onClose={this.handleToastClose}
          message={this.state.toast.message}
          type={this.state.toast.type}
        />

        <form>
          <div className="logo">
            <img src={Logo} alt="Frequencia" />
          </div>

          <div className="contents">
            <div>
              <p>Email</p>
              <input type="email" name="email" onChange={this.handleChange} />
              <p className="error">{this.state.emailError}</p>
            </div>

            <div>
              <p>Senha</p>
              <input type="password" name="pswd" onChange={this.handleChange} />
              <p className="error">{this.state.pswdError}</p>

              <div className="alternative" style={{ margin: 0 }}>
                <p onClick={this.handleDialog}>Esqueceu a senha?</p>
                {/*<NavLink to="/signup" className="alternative">
                  <p>Cadastrar</p>
                </NavLink>*/}
              </div>
            </div>

            <div className="buttonGroup">
              <button onClick={this.handleLogin}>ENTRAR</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
