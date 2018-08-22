import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "../css/login.css";

export default class logIn extends Component {
  state = {
    wallet: {},
    id: ""
  };

  handleChange = data => {
    this.setState({ id: data });
  };

  getUserWallet = () => {
    this.props.chngWallId(this.state.id);
  };

  render() {
    return (
      <div className="App">
        <div className="back" />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="headerText"> Easy Wallet</p>
        </header>
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
              onClick={this.getUserWallet}
              style={{ backgroundColor: "#00adb5" }}
              className="btnL"
            >
              <Link to={`/home`}>Log in</Link>
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
