import React, { Component } from "react";
import "../css/receive.css";
import Axios from "axios";

export default class Receive extends Component {
  state = {
    recAddress: ""
  };

  componentWillMount() {
    this.setState({ recAddress: this.props.address });
  }

  render() {
    return (
      <div className="receiveBody">
        <p className="message">This is your receive address!</p>
        <div className="id">{this.state.recAddress}</div>
        <p className="explain">
          *When you want someone to send you funds you give them your receive
          address!
        </p>
      </div>
    );
  }
}
