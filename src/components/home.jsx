import React, { Component } from "react";
import logo from "../images/logo.png";
import btcLogo from "../images/btc.png";
import ltcLogo from "../images/litecoin.svg";
import btcBalance from "../images/balance.png";
import logout from "../images/logout.png";
import "../css/home.css";
import Axios from "axios";
import Receive from "./receive";
import Send from "./send";
import Transactions from "./transactions";
import { Redirect } from "react-router-dom";

const OpenedTab = {
  TAB1: 1,
  TAB2: 2,
  TAB3: 3
};

export default class Home extends Component {
  state = {
    btInUSD: 0,
    walletID: "",
    balance: 0,
    coin: "",
    transactions: [],
    serverPath: "",
    logout: false,
    tab: 1,
    recAddress: ""
  };

  componentDidMount() {
    sessionStorage.setItem("wallId", this.state.walletID);
    sessionStorage.setItem("coin", this.state.coin);
    this.getBitInUSD();
    this.interval1 = setInterval(this.getBitInUSD, 300000);
    this.getBitBalance();
    this.interval2 = setInterval(this.getBitBalance, 30000);
    this.getAllTransactions();
    this.getAdd();
  }

  componentWillMount() {
    if (this.props.wallId !== "" && this.props.coin !== "") {
      this.setState({ walletID: this.props.wallId });
      this.setState({ coin: this.props.coin });
    } else {
      this.setState({ walletID: sessionStorage.getItem("wallId") });
      this.setState({ coin: sessionStorage.getItem("coin") });
    }
    this.setState({ serverPath: this.props.serverPath });
  }

  componentWillUnmount() {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
  }

  getAllTransactions() {
    Axios.get(
      `${this.state.serverPath}/trans?id=${this.state.walletID}&coin=${
        this.state.coin
      }`
    ).then(res => {
      this.setState({ transactions: res.data.transfers });
    });
  }

  getBitInUSD = () => {
    console.log("usd");
    if (this.state.coin === "tbtc") {
      Axios.get("https://blockchain.info/tobtc?currency=USD&value=1").then(
        res => {
          let a = 1 / res.data;
          this.setState({ btInUSD: a });
        }
      );
    } else if (this.state.coin === "tltc") {
      Axios.get("https://api.cryptonator.com/api/ticker/ltc-usd").then(res => {
        let a = res.data.ticker.price;
        this.setState({ btInUSD: a });
      });
    }
  };

  getAdd = () => {
    Axios.get(
      `${this.state.serverPath}?id=${this.state.walletID}&coin=${
        this.state.coin
      }`
    ).then(res => {
      this.setState({ recAddress: res.data.receiveAddress.address });
    });
  };

  getBitBalance = () => {
    console.log("bal");
    let dest = `${this.state.serverPath}/?id=${this.state.walletID}&coin=${
      this.state.coin
    }`;
    Axios.get(dest).then(res => {
      this.setState({ balance: res.data.balance });
    });
  };

  handleClick = bt => {
    this.setState({ tab: bt });
    if (bt === 3) {
      this.getAllTransactions();
    }
  };

  handleLogOut = () => {
    sessionStorage.setItem("wallId", "");
    sessionStorage.setItem("coin", "");
    this.props.chngWallCoin("tbtc");
    this.props.chngWallId("");
    this.setState({ logout: true });
  };

  render() {
    const { tab } = this.state;

    let tabButton = {
      flexGrow: 1,
      backgroundColor: "#00adb5"
    };

    let tabButton1 = tabButton,
      tabButton2 = tabButton,
      tabButton3 = tabButton;

    if (tab === OpenedTab.TAB1) {
      tabButton1 = {
        flexGrow: 2,
        backgroundColor: "#222831"
      };
    }
    if (tab === OpenedTab.TAB2) {
      tabButton2 = {
        flexGrow: 2,
        backgroundColor: "#222831"
      };
    }
    if (tab === OpenedTab.TAB3) {
      tabButton3 = {
        flexGrow: 2,
        backgroundColor: "#222831"
      };
    }

    if (this.state.logout) {
      return <Redirect to="/" />;
    }
    return (
      <div className="App">
        <header className="home-header">
          <img src={logo} className="home-logo" alt="logo" />
          <p className="homeTitle"> Easy Wallet</p>
          <div className="btValue">
            <img
              width="64px"
              height="64px"
              src={this.state.coin === "tbtc" ? btcLogo : ltcLogo}
              alt="1 Bitcoin in euros"
            />
            <br />
            <p style={{ color: "#eeeeee" }}>
              $ {parseFloat(this.state.btInUSD.toString()).toFixed(2)}
            </p>
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
              {this.state.balance / 1e8}{" "}
              {this.state.coin === "tbtc" ? "BTC" : "LTC"}
            </p>
          </div>
          <div className="logOut">
            <img
              alt="Log out"
              width="64px"
              height="64px"
              src={logout}
              onClick={this.handleLogOut}
            />
          </div>
        </header>

        <div className="featuresContainer">
          <div className="buttonBox">
            <button style={tabButton1} onClick={() => this.handleClick(1)}>
              Send
            </button>
            <button style={tabButton2} onClick={() => this.handleClick(2)}>
              Receive
            </button>
            <button style={tabButton3} onClick={() => this.handleClick(3)}>
              Transactions
            </button>
          </div>
          <div className="tabs">
            {tab === OpenedTab.TAB1 ? (
              <Send
                wallID={this.state.walletID}
                balance={this.state.balance}
                coin={this.state.coin}
                serverPath={this.state.serverPath}
              />
            ) : tab === OpenedTab.TAB2 ? (
              <Receive address={this.state.recAddress} />
            ) : (
              <Transactions
                trans={this.state.transactions}
                wallID={this.state.walletID}
                coin={this.state.coin}
                serverPath={this.state.serverPath}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
