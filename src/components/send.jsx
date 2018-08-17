import React, { Component } from "react";
import "../css/send.css";

export default class send extends Component {
  state = {};
  render() {
    return (
      <div className="sendBody">
        <input
          className="inputSendID"
          placeholder="ID of reciever"
          type="text"
        />
        <input className="inputSendAmount" placeholder="€" type="number" />
      </div>
    );
  }
}
