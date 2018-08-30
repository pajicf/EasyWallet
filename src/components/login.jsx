import React, { Component } from "react";
import { Redirect } from "react-router";
import logo from "../images/logo.png";
import ltc from "../images/litecoin.svg";
import btc from "../images/btc.png";
import { Link } from "react-router-dom";
import "../css/login.css";
import Axios from "axios";

const LoginStatuses = {
  LOG_IN: "log_in",
  LOGGING_IN: "logging_in",
  LOGGED_IN: "logged_in"
};

const CoinType = {
  TBTC: "tbtc",
  TLTC: "tltc"
};

export default class logIn extends Component {
  state = {
    status: LoginStatuses.LOG_IN,
    coin: CoinType.TBTC,
    wallet: {},
    id: "",
    redirect: false,
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
    this.setState({
      status: LoginStatuses.LOGGING_IN
    });
    this.checkIfWalletExists();
  };

  checkIfWalletExists = () => {
    Axios.get(
      `${this.state.serverPath}?id=${this.state.id}&coin=${this.state.coin}`
    )
      .then(res => {
        this.setState({
          status: LoginStatuses.LOGGED_IN
        });
      })
      .catch(error => {
        this.setState({
          status: LoginStatuses.LOG_IN
        });
        alert("WRONG WALLET ID");
      });
  };

  handleType(but) {
    if (but === 1) {
      this.setState({ coin: "tbtc" });
      this.props.chngWallCoin("tbtc");
    } else {
      this.setState({ coin: "tltc" });
      this.props.chngWallCoin("tltc");
    }
  }

  render() {
    const { status } = this.state;
    const { coin } = this.state;

    if (status === LoginStatuses.LOGGED_IN) {
      return <Redirect push to="/home" />;
    }

    let loginButtonText = "Log in";

    if (status === LoginStatuses.LOGGING_IN) {
      loginButtonText = "Logging in";
    }

    let bitCoinButton = {
      backgroundColor: "#fd9200",
      boxShadow: "0 0 60px #faa02a"
    };
    let liteCoinButton = {
      backgroundColor: "rgba(0,0,0,0)",
      boxShadow: "none"
    };

    if (coin === CoinType.TLTC) {
      bitCoinButton = { backgroundColor: "rgba(0,0,0,0)", boxShadow: "none" };
      liteCoinButton = {
        backgroundColor: "#bdbdbd",
        boxShadow: "0 0 60px #747272"
      };
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
            style={bitCoinButton}
            onClick={() => this.handleType(1)}
          >
            <img alt="img1" width="128px" height="128px" src={btc} />
          </button>
          <button
            id="btnType2"
            className="liteCoinBtn"
            style={liteCoinButton}
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
              disabled={status === LoginStatuses.LOGGING_IN}
              style={{ backgroundColor: "#00adb5" }}
              className="btnL"
            >
              {loginButtonText}
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
