import React, { Component } from "react";
import "../css/receive.css";
import Axios from "axios";

export default class Receive extends Component {
  state = {
    walletID: "djklghha2412sdiai12sdafUOUSYF7&f0418989"
  };

  render() {
    return (
      <div className="receiveBody">
        <p class="message">You need to give this to person paying you!</p>
        <p className="id">{this.state.walletID}</p>
      </div>
    );
  }
}
