import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import logo from "../images/logo.png";
import "../css/login.css";
import { runInThisContext } from "vm";

export default class logIn extends Component {
  state = {
    wallet: {},
    id: ""
  };

  handleChange = data => {
    this.setState({ id: data });
  };

  render() {
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
<<<<<<< HEAD
            <Link to={`/home/${this.state.id}`}>
              <button
                onClick={this.getUserWallet}
                style={{ backgroundColor: "#00adb5" }}
                className="btnL"
              >
                Log in
              </button>
            </Link>
=======
            <button
              onClick={this.getUserWallet}
              style={{ backgroundColor: "#00adb5" }}
              className="btnL"
            >
              <Link
                style={{ textDecoration: "none" }}
                className="linkToHome"
                to={`/home`}
              >
                Log in
              </Link>
            </button>

>>>>>>> bd8be155904f51340271214962314cbd2085fcda
            <a href="/new">
              <button className="btnL">New wallet</button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
