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
    btInUSD: 0,
    walletID: "",
    balance: "/",
    transactions: []
  };

  componentDidMount() {
    this.getBitInUSD();
    setInterval(this.getBitInUSD, 300000);
    this.hideEl();
    this.getBitBalance();
    setInterval(this.getBitBalance, 30000);
    this.getAllTransactions();
  }

  componentWillMount() {
    this.setState({ walletID: this.props.match.params.id });
  }

  getAllTransactions() {
    Axios.get(`http://localhost:8080/wallet/trans/${this.state.walletID}`).then(
      res => {
        console.log(res.data.transactions);
        this.setState({ transactions: res.data.transactions });
      }
    );
  }

  getBitInUSD = () => {
    Axios.get("https://blockchain.info/tobtc?currency=USD&value=1").then(
      res => {
        let a = 1 / res.data;
        this.setState({ btInUSD: a.toFixed(2) });
      }
    );
  };

  getBitBalance = () => {
    Axios.get(`http://localhost:8080/wallet/${this.state.walletID}`).then(
      res => {
        console.dir(res);
        this.setState({ balance: res.data.balance });
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
            <p style={{ color: "#eeeeee" }}>$ {this.state.btInUSD}</p>
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
              Balance:
              <br />
              {this.state.balance / 1e8} TBTC
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
            <Send wallID={this.state.walletID} balance={this.state.balance} />
          </div>
          <div id="receiveDisplay">
            <Receive wallID={this.state.walletID} />
          </div>
          <div id="transactionsDisplay">
            <Transactions
              trans={this.state.transactions}
              wallID={this.state.walletID}
            />
          </div>
        </div>
      </div>
    );
  }
}
