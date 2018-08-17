import React, { Component } from "react";
import logo from "../images/logo.png";
import "../css/newWallet.css";

export default class newWallet extends Component {
  state = {};

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="headerText"> Easy Wallet</p>
        </header>
        <div className="box">
          <p className="warning">
            CAUTION: This is your wallet ID, don't lose it or give it to anyone.{" "}
            <br /> If you lose it your money may get stolen.
          </p>
          <div className="newWalletID">
            v2x098b41c78c2232e8b732dd0958a9bec34f29b54155d145496d69d4cb0e76cd33
          </div>
          <p className="centerText">Double click on ID then copy it</p>
          <a href="/">
            <button className="btnL" style={{ backgroundColor: "#00adb5" }}>
              Go to login
            </button>
          </a>
        </div>
      </div>
    );
  }
}
