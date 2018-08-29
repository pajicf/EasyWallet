import React, { Component } from "react";
import { Redirect } from "react-router";
import logo from "../images/logo.png";
import ltc from "../images/litecoin.svg";
import btc from "../images/btc.png";
import { Link } from "react-router-dom";
import "../css/login.css";
import Axios from "axios";

export default class logIn extends Component {
  state = {
    wallet: {},
    id: "",
    redirect: false,
    coin: "tbtc",
    serverPath: ""
  };

  componentWillMount() {
    this.setState({ serverPath: this.props.serverPath });
  }

  handleChange = data => {
    this.setState({ id: data });
  };

  btnLogIn = () => {
    this.props.chngWallId(this.state.id);
    let btnLID = document.getElementById("btnLID");
    btnLID.style.backgroundColor = "#BDBDBD";
    btnLID.innerHTML = "Logging in";
    this.checkIfWalletExists();
  };

  checkIfWalletExists = () => {
    let btnLID = document.getElementById("btnLID");
    Axios.get(
      `${this.state.serverPath}?id=${this.state.id}&coin=${this.state.coin}`
    )
      .then(res => {
        btnLID.style.backgroundColor = "#00adb5";
        btnLID.innerHTML = "Log in";
        this.setState({ redirect: true });
      })
      .catch(error => {
        btnLID.style.backgroundColor = "#00adb5";
        btnLID.innerHTML = "Log in";
        alert("WRONG WALLET ID");
      });
  };

  handleType(but) {
    let btnType1 = document.getElementById("btnType1");
    let btnType2 = document.getElementById("btnType2");
    if (but === 1) {
      btnType2.style.backgroundColor = "rgba(0,0,0,0)";
      btnType2.style.boxShadow = "none";
      btnType1.style.backgroundColor = "#fd9200";
      btnType1.style.boxShadow = "0 0 60px #faa02a";
      this.setState({ coin: "tbtc" });
      this.props.chngWallCoin("tbtc");
    } else {
      btnType1.style.backgroundColor = "rgba(0,0,0,0)";
      btnType1.style.boxShadow = "none";
      btnType2.style.backgroundColor = "#bdbdbd";
      btnType2.style.boxShadow = "0 0 60px #747272";
      this.setState({ coin: "tltc" });
      this.props.chngWallCoin("tltc");
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
              id="btnLID"
              onClick={this.btnLogIn}
              style={{ backgroundColor: "#00adb5" }}
              className="btnL"
            >
              Log in
            </button>

            <Link to="/new">
              <button className="btnL">New wallet</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
