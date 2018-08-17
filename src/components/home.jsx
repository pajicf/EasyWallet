import React, { Component } from "react";
import logo from "../images/logo.png";
import btcLogo from "../images/btc.png";
import btcBalance from "../images/balance.png";
import "../css/home.css";
import Axios from "axios";

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
      </div>
    );
  }
}
