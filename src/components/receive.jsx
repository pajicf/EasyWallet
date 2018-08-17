import React, { Component } from "react";
import "../css/receive.css";
import Axios from "axios";

export default class Receive extends Component {
  state = {
    walletID: "2N4CTAPvmm5SrryubndTskMcLRrSJWdKsRG"
  };

  render() {
    return (
      <div>
        <p className="message">This is your receive address!</p>
        <p className="id">{this.state.walletID}</p>
        <p className="explain">
          *When you want someone to send you funds you give them your receive
          address!
        </p>
      </div>
    );
  }
}
