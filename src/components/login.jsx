import React, { Component } from "react";
import { Redirect } from "react-router";
import logo from "../images/logo.png";
import ltc from "../images/litecoin.svg";
import btc from "../images/btc.png";
import "../css/login.css";
import Axios from "axios";

export default class logIn extends Component {
  state = {
    wallet: {},
    id: "",
    redirect: false,
    coin: "tbtc"
  };

  componentDidMount() {
    document.getElementById("btnType1").style.backgroundColor = "#fd9200";
    document.getElementById("btnType1").style.boxShadow = "0 0 60px #faa02a";
    document.getElementById("btnType1").style.flexGrow = "2";
  }

  handleChange = data => {
    this.setState({ id: data });
  };

  btnLogIn = () => {
    this.props.chngWallId(this.state.id);
    this.props.chngWallCoin(this.state.coin);
    this.checkIfWalletExists();
  };

  checkIfWalletExists = () => {
    Axios.get(
      `http://localhost:8080/wallet?id=${this.state.id}&coin=${this.state.coin}`
    )
      .then(res => {
        console.log(`Res: ${res}`);
        this.setState({ redirect: true });
      })
      .catch(error => {
        alert("WRONG WALLET ID");
      });
  };

  handleType(but) {
    if (but === 1) {
      document.getElementById("btnType2").style.backgroundColor =
        "rgba(0,0,0,0)";
      document.getElementById("btnType2").style.boxShadow = "none";
      document.getElementById("btnType1").style.backgroundColor = "#fd9200";
      document.getElementById("btnType1").style.boxShadow = "0 0 60px #faa02a";
      this.setState({ coin: "tbtc" });
    } else {
      document.getElementById("btnType1").style.backgroundColor =
        "rgba(0,0,0,0)";
      document.getElementById("btnType1").style.boxShadow = "none";
      document.getElementById("btnType2").style.backgroundColor = "#bdbdbd";
      document.getElementById("btnType2").style.boxShadow = "0 0 60px #747272";
      this.setState({ coin: "tltc" });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/home" />;
    }

    return (
      <div className="App">
        <div className="back" />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="headerText"> Easy Wallet</p>
        </header>
        <div className="coinType">
          <p className="chooseType"> Which curency do you want to use?</p>
          <button
            id="btnType1"
            className="bitCoinBtn"
            onClick={() => this.handleType(1)}
          >
            <img alt="img1" width="128px" height="128px" src={btc} />
          </button>
          <button
            id="btnType2"
            className="liteCoinBtn"
            onClick={() => this.handleType(2)}
          >
            <img alt="img2" width="128px" height="128px" src={ltc} />
          </button>
        </div>
        <div className="box">
          <input
            id="ID"
            className="wallID"
            placeholder="Enter your ID"
            type="text"
            onChange={event => this.handleChange(event.target.value)}
          />
          <div className="buttonsBox">
            <button
              onClick={this.btnLogIn}
              style={{ backgroundColor: "#00adb5" }}
              className="btnL"
            >
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
