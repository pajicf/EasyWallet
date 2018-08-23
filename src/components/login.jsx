import React, { Component } from "react";
import { Redirect } from "react-router";
import logo from "../images/logo.png";
import "../css/login.css";
import Axios from "axios";

export default class logIn extends Component {
  state = {
    wallet: {},
    id: "",
    redirect: false
  };

  handleChange = data => {
    this.setState({ id: data });
  };

  btnLogIn = () => {
    this.props.chngWallId(this.state.id);
    this.checkIfWalletExists();
  };

  checkIfWalletExists = () => {
    Axios.get(`http://localhost:8080/wallet?id=${this.state.id}&coin=tbtc`)
      .then(res => {
        console.log(`Res: ${res}`);
        this.setState({ redirect: true });
      })
      .catch(error => {
        alert("WRONG WALLET ID");
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/home" />;
    }

    return (
      <div className="App">
        <div className="back" />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="headerText"> Easy Wallet</p>
        </header>
        <div className="box">
          <input
            id="ID"
            className="wallID"
            placeholder="Enter your ID"
            type="text"
            onChange={event => this.handleChange(event.target.value)}
          />
          <div className="buttonsBox">
            <button
              onClick={this.btnLogIn}
              style={{ backgroundColor: "#00adb5" }}
              className="btnL"
            >
              Log in
            </button>

            <a href="/new">
              <button className="btnL">New wallet</button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
