import React, { Component } from "react";
import "../css/receive.css";
import Axios from "axios";

export default class Receive extends Component {
  state = {
    walletID: "djklghha2412sdiai12sdafUOUSYF7&f0418989"
  };

  render() {
    return (
      <div>
        <p className="message">This is your receive address!</p>
        <div className="receiveBody">
          <p className="id">{this.state.walletID}</p>
        </div>
      </div>
    );
  }
}
