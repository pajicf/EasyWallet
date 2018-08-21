import React, { Component } from "react";
import "../css/send.css";
import Axios from "axios";

export default class send extends Component {
  state = {
    ammInBTC: 0,
    btInEur: 0
  };

  handleChange = () => {
    let conv =
      document.getElementById("inputAmountID").value / this.state.btInEur;

    this.setState({ ammInBTC: conv.toFixed(8) });
  };

  componentDidMount() {
    this.getBitInEuro();
  }

  getBitInEuro = () => {
    Axios.get("https://blockchain.info/tobtc?currency=USD&value=1").then(
      res => {
        let a = Math.round(1 / res.data);
        this.setState({ btInEur: a });
      }
    );
  };

  render() {
    return (
      <div className="sendBody">
        <div className="inputs">
          <input
            className="inputSendID"
            placeholder="ID of reciever"
            type="text"
          />
          <input
            id="inputAmountID"
            className="inputSendAmount"
            placeholder="$"
            type="number"
            onChange={() => this.handleChange()}
          />
          <p className="satoshis">Amount in bitcoins: {this.state.ammInBTC}</p>
          <div style={{ width: "100%" }}>
            <button className="btnSend">Send</button>
          </div>
        </div>
      </div>
    );
  }
}
