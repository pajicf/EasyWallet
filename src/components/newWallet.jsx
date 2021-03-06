import React, { Component } from "react";
import Axios from "axios";
import logo from "../images/logo.png";
import loader from "../images/loader.gif";
import ltc from "../images/litecoin.svg";
import btc from "../images/btc.png";
import "../css/newWallet.css";

const Loader = {
  LOADING: "V1",
  LOADED: "V2"
};

export default class NewWallet extends Component {
  state = {
    wallet: {
      id: ""
    },
    coin: "",
    serverPath: "",
    status: Loader.LOADING
  };

  componentDidMount() {
    this.generateNewWallet();
  }

  componentWillMount() {
    this.setState({ coin: this.props.coin });
    this.setState({ serverPath: this.props.serverPath });
  }

  generateNewWallet() {
    return new Promise((resolve, reject) => {
      Axios.post(`${this.state.serverPath}`, { coin: this.state.coin })
        .then(res => {
          this.setState({ status: Loader.LOADED });
          this.setState({ wallet: res.data });
        })
        .catch(error => {
          this.setState({
            wallet: { id: "Error has occured! Try later." }
          });
        });
    });
  }

  render() {
    const { status } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="headerText"> Easy Wallet</p>
        </header>
        <div className="box">
          <p className="warning" id="warning">
            CAUTION:
            <br /> This is your wallet ID, don't lose it or give it to anyone.
            <br /> If you lose it your money might be stolen and you won't be
            able to recover it.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "-30px"
            }}
          >
            <div
              style={{ width: "100%", marginBottom: "-18px", display: "block" }}
            >
              <p
                style={{
                  fontSize: "25px"
                }}
              >
                <img
                  align="top"
                  alt="Coin"
                  width="32px"
                  height="32px"
                  src={this.state.coin === "tbtc" ? btc : ltc}
                />
                {"   "}
                This is your new wallet ID
              </p>
            </div>
            <div className="newWalletID" style={{ display: "block" }}>
              {this.state.wallet.id}
              <img
                alt="loader"
                id="loader"
                src={loader}
                width="40px"
                height="40px"
                style={{
                  display: status === Loader.LOADED ? "none" : "inline"
                }}
              />
            </div>
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
