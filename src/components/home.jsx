import React, { Component } from "react";
import logo from "../images/logo.png";
import btcLogo from "../images/btc.png";
import btcBalance from "../images/balance.png";
import "../css/home.css";
import Axios from "axios";
import Receive from "./receive";
import Send from "./send";
import Transactions from "./transactions";

export default class home extends Component {
  state = {
    btInEur: 0
  };

  componentDidMount() {
    this.getBitInEuro();
    setInterval(this.getBitInEuro, 600000);
    this.hideEl();
  }

  getBitInEuro = () => {
    Axios.get("https://blockchain.info/tobtc?currency=EUR&value=1").then(
      res => {
        let a = 1 / res.data;
        this.setState({ btInEur: a.toFixed(2) });
      }
    );
  };

  hideEl = () => {
    document.getElementById("sendDisplay").style.display = "none";
    document.getElementById("receiveDisplay").style.display = "none";
    document.getElementById("transactionsDisplay").style.display = "none";
    document.getElementById("btn1").style.flexGrow = 1;
    document.getElementById("btn2").style.flexGrow = 1;
    document.getElementById("btn3").style.flexGrow = 1;
    document.getElementById("btn1").style.backgroundColor = "#00adb5";
    document.getElementById("btn2").style.backgroundColor = "#00adb5";
    document.getElementById("btn3").style.backgroundColor = "#00adb5";
  };

  showEl = (tagName, btNum) => {
    document.getElementById(`${tagName}`).style.display = "inline";
    document.getElementById(`btn${btNum}`).style.flexGrow = 2;
    document.getElementById(`btn${btNum}`).style.backgroundColor = "#222831";
  };

  handleClick = bt => {
    if (bt === 1) {
      this.hideEl();
      this.showEl("sendDisplay", 1);
    }
    if (bt === 2) {
      this.hideEl();
      this.showEl("receiveDisplay", 2);
    }
    if (bt === 3) {
      this.hideEl();
      this.showEl("transactionsDisplay", 3);
    }
  };

  render() {
    return (
      <div className="App">
        <header className="home-header">
          <img src={logo} className="home-logo" alt="logo" />
          <p className="homeTitle"> Easy Wallet</p>
          <div className="btValue">
            <img
              width="64px"
              height="64px"
              src={btcLogo}
              alt="1 Bitcoin in euros"
            />
            <br />
            <p style={{ color: "#eeeeee" }}>{this.state.btInEur}€</p>
          </div>
          <div className="btBalance">
            <img
              width="64px"
              height="64px"
              src={btcBalance}
              alt="Your wallet's Bitcoin balance"
            />
            <br />
            <p style={{ color: "#eeeeee" }}>
              Ballance:
              <br />
              1.7814 BTC
            </p>
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
              Pending Transactions
            </button>
          </div>
          <div id="sendDisplay">
            <Send />
          </div>
          <div id="receiveDisplay">
            <Receive />
          </div>
          <div id="transactionsDisplay">
            <Transactions />
          </div>
        </div>
      </div>
    );
  }
}
