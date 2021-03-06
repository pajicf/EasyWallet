import React, { Component } from "react";
import "../css/receive.css";
import Axios from "axios";

export default class Receive extends Component {
  state = {
    walletID: "",
    recAddress: "",
    coin: "",
    serverPath: ""
  };

  componentWillMount() {
    this.setState({ walletID: this.props.wallID });
    this.setState({ coin: this.props.coin });
    this.setState({ serverPath: this.props.serverPath });
  }
  componentDidMount() {
    this.getAdd();
  }

  getAdd = () => {
    Axios.get(
      `${this.state.serverPath}?id=${this.state.walletID}&coin=${
        this.state.coin
      }`
    ).then(res => {
      this.setState({ recAddress: res.data.receiveAddress.address });
    });
  };

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
