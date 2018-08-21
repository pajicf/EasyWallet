import React, { Component } from "react";
// import Axios from "axios";
import logo from "../images/logo.png";
import "../css/login.css";

export default class logIn extends Component {
  state = {
    wallet: {}
  };

  // getUserWallet() {
  //   let id = document.getElementById("ID").innerHTML;
  //   // Axios.get("http://")
  // }

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
          />
          <div className="buttonsBox">
            <a href={`/home`}>
              <button style={{ backgroundColor: "#00adb5" }} className="btnL">
                Log in
              </button>
            </a>
            <a href="/new">
              <button className="btnL">New wallet</button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
