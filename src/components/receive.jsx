import React, { Component } from "react";
import "../css/receive.css";
import Axios from "axios";

export default class receive extends Component {
  state = {
    walletID: "djklghha2412sdiai12sdafUOUSYF7&f0418989"
  };

  render() {
    return (
      <div className="receiveBody">
        <p calssName="">You need to give this to person paying you!</p>
        <p className="">{this.state.walletID}</p>
      </div>
    );
  }
}
