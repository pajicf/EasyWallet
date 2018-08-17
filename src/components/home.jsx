import React, { Component } from "react";
import logo from "../images/logo.png";
import btcLogo from "../images/btc.png";
import btcBalance from "../images/balance.png";
import "../css/home.css";
import Receive from "./receive";
import Axios from "axios";
import Send from "./send";

export default class home extends Component {
  state = {
    btInEur: ""
  };

  componentDidMount() {
    this.getBitInEuro();
  }

  getBitInEuro = () => {
    Axios.get("https://blockchain.info/tobtc?currency=EUR&value=1").then(
      res => {
        this.setState({ btInEur: res.data });
      }
    );
  };

  handleClick = bt => {
    if (bt === 1) {
      document.getElementById("sendDisplay").style.display = "inline";
      document.getElementById("btn1").style.backgroundColor = "#222831";
      document.getElementById("receiveDisplay").style.display = "none";
      document.getElementById("btn2").style.backgroundColor = "#00adb5";
      document.getElementById("transactionsDisplay").style.display = "none";
      document.getElementById("btn3").style.backgroundColor = "#00adb5";
    }
    if (bt === 2) {
      document.getElementById("sendDisplay").style.display = "none";
      document.getElementById("btn1").style.backgroundColor = "#00adb5";
      document.getElementById("receiveDisplay").style.display = "inline";
      document.getElementById("btn2").style.backgroundColor = "#222831";
      document.getElementById("transactionsDisplay").style.display = "none";
      document.getElementById("btn3").style.backgroundColor = "#00adb5";
    }
    if (bt === 3) {
      document.getElementById("sendDisplay").style.display = "none";
      document.getElementById("btn1").style.backgroundColor = "#00adb5";
      document.getElementById("receiveDisplay").style.display = "none";
      document.getElementById("btn2").style.backgroundColor = "#00adb5";
      document.getElementById("transactionsDisplay").style.display = "inline";
      document.getElementById("btn3").style.backgroundColor = "#222831";
    }
  };

  render() {
    return (
      <div className="App">
        <header className="home-header">
          <img src={logo} className="home-logo" alt="logo" />
          <p className="homeTitle"> Easy Wallet</p>
          <div className="btValue">
            <img width="64px" height="64px" src={btcLogo} />
            <br />
            <p style={{ color: "#eeeeee" }}>{this.state.btInEur}€</p>
          </div>
          <div className="btBalance">
            <img width="64px" height="64px" src={btcBalance} />
            <br />
            <p style={{ color: "#eeeeee" }}>1.78 BTC</p>
          </div>
        </header>

        <div className="featuresContainer">
          <div className="buttonBox">
            <button id="btn1" onClick={() => this.handleClick(1)}>
              Send
            </button>
            <button id="btn2" onClick={() => this.handleClick(2)}>
              Receive
            </button>
            <button id="btn3" onClick={() => this.handleClick(3)}>
              Transactions
            </button>
          </div>
          <div id="sendDisplay" style={{ display: "none" }}>
            <Send />
          </div>
          <div id="receiveDisplay" style={{ display: "none" }}>
            <Receive />
          </div>
          <div id="transactionsDisplay" style={{ display: "none" }} />
        </div>
      </div>
    );
  }
}
