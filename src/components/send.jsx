import React, { Component } from "react";
import "../css/send.css";
import Axios from "axios";

export default class send extends Component {
  state = {
    walletID: "",
    ammInBTC: 0,
    btInUSD: 0
  };

  sendCash = () => {
    let amUSD = document.getElementById("inputAmountID").value;
    let amBTC = amUSD / this.state.btInUSD;
    let amSatoshi = amBTC * 1e8;
    console.log(Math.round(amSatoshi));
    let rec = document.getElementById("receiver").value;
    Axios.post("http://localhost:8080/wallet/send", {
      amount: Math.round(amSatoshi),
      address: rec,
      walletId: this.state.walletID
    })
      .then(res => {
        window.location.reload(true);
      })
      .catch(error => {
        console.log(error);
      });

    document.getElementById("inputAmountID").disabled = true;
    document.getElementById("receiver").disabled = true;
    document.getElementById("sendButton").disabled = true;
    document.getElementById("sendButton").innerHTML = "Sending";
    document.getElementById("sendButton").style.backgroundColor = "#fd9200";
    setTimeout(() => {
      document.getElementById("sendButton").style.backgroundColor = "#393e46";
      document.getElementById("sendButton").disabled = false;
      document.getElementById("inputAmountID").disabled = false;
      document.getElementById("receiver").disabled = false;
      document.getElementById("sendButton").innerHTML = "Send";
      document.getElementById("receiver").value = null;
      document.getElementById("inputAmountID").value = null;
    }, 2000);
  };

  componentWillMount() {
    this.setState({ walletID: this.props.wallID });
  }

  handleChange = () => {
    let conv =
      document.getElementById("inputAmountID").value / this.state.btInUSD;

    this.setState({ ammInBTC: conv.toFixed(8) });
  };

  componentDidMount() {
    this.getBitInUSD();
  }

  getBitInUSD = () => {
    Axios.get("https://blockchain.info/tobtc?currency=USD&value=1").then(
      res => {
        let a = Math.round(1 / res.data);
        this.setState({ btInUSD: a });
      }
    );
  };

  render() {
    return (
      <div className="sendBody">
        <div className="inputs">
          <input
            id="receiver"
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
          <p className="satoshis">Amount in BTC: {this.state.ammInBTC}</p>
          <div style={{ width: "100%" }}>
            <button
              id="sendButton"
              onClick={() => this.sendCash()}
              className="btnSend"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}
