import React, { Component } from "react";
import logo from "./images/logo.png";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="headerText"> Easy Wallet</p>
        </header>
        <div className="box">
          <input className="wallID" placeholder="Enter your ID" type="text" />
          <div className="buttonsBox">
            <button style={{ backgroundColor: "#00adb5" }} className="btnL">
              Log in
            </button>
            <button className="btnL">New wallet</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
