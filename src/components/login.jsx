import React, { Component } from "react";
import logo from "../images/logo.png";
import "../css/login.css";

export default class logIn extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="headerText"> Easy Wallet</p>
        </header>
        <div className="box">
          <input className="wallID" placeholder="Enter your ID" type="text" />
          <div className="buttonsBox">
            <button style={{ backgroundColor: "#00adb5" }} className="btnL">
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
