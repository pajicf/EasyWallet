import React, { Component } from "react";
import Axios from "axios";
import logo from "../images/logo.png";
import "../css/newWallet.css";

export default class newWallet extends Component {
  state = {
    wallet: {
      id: ""
    }
  };

  componentDidMount() {
    this.generateNewWallet();
  }

  generateNewWallet() {
    return new Promise((resolve, reject) => {
      Axios.post("http://localhost:8080/wallet", "REQUEST")
        .then(res => {
          this.setState({ wallet: res.data });
        })
        .catch(error => {
          this.setState({
            wallet: { id: "Error has occured! Try later." }
          });
          document.getElementById("warning").style.display = "none";
        });
    });
  }

  render() {
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
          <div className="newWalletID">{this.state.wallet.id}</div>
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
