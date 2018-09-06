import React, { Component } from "react";
import "../css/send.css";
import Axios from "axios";

const Send = {
  SEND: "Send",
  SENDING: "Sending"
};
export default class SendClass extends Component {
  state = {
    walletID: "",
    ammInBTC: 0,
    btInUSD: 0,
    coin: "",
    serverPath: "",
    value: "",
    send: Send.SEND,
    receiver: ""
  };

  componentWillMount() {
    this.setState({ walletID: this.props.wallID });
    this.setState({ coin: this.props.coin });
    this.setState({ serverPath: this.props.serverPath });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  sendCash = () => {
    let amUSD = this.state.value;
    let amBTC = amUSD / this.state.btInUSD;
    let amSmlUnit = amBTC * 1e8;
    let rec = this.state.receiver.trim();
    console.log(rec);
    console.log(amSmlUnit + " " + this.props.balance);
    if (amSmlUnit <= 0 || rec === "" || amSmlUnit >= this.props.balance) {
      alert("Addres or amount is not valid");
    } else {
      this.setState({ send: Send.SENDING });

      Axios.post(`${this.state.serverPath}/send`, {
        amount: Math.round(amSmlUnit),
        address: rec,
        walletId: this.state.walletID,
        coin: this.state.coin
      })
        .then(res => {
          this.setState({ send: Send.SEND });
          console.dir(res);
          if (res.data.error === "err") {
            this.endSend();
            alert("Invalid address!");
          } else {
            this.endSend();
            alert("Your transaction has been submitted and is now pending!");
          }
        })
        .catch(error => {
          this.endSend();
          alert(
            "Error while submitting transaction! Please check your internet connection, your funds and try again later!"
          );
        });
    }
  };

  endSend() {
    console.log("I was summoned!");
    this.setState({ ammInBTC: "" });
    this.setState({ receiver: "" });
    this.setState({ value: "" });
  }

  handleKeyDown = e => {
    if (
      !(
        (e.keyCode > 95 && e.keyCode < 106) ||
        (e.keyCode > 47 && e.keyCode < 58) ||
        e.keyCode === 8
      )
    ) {
      e.preventDefault();
    }
  };

  handleChange = e => {
    this.setState({ value: e });
    let conv = e / this.state.btInUSD;
    this.setState({ ammInBTC: conv.toFixed(8) });
  };

  componentDidMount() {
    this.getBitInUSD();
    this.interval = setInterval(this.getBitInUSD, 30000);
  }

  getBitInUSD = () => {
    if (this.state.coin === "tbtc") {
      Axios.get("https://blockchain.info/tobtc?currency=USD&value=1").then(
        res => {
          let a = 1 / res.data;
          this.setState({ btInUSD: a });
        }
      );
    } else if (this.state.coin === "tltc") {
      Axios.get("https://api.cryptonator.com/api/ticker/ltc-usd").then(res => {
        let a = res.data.ticker.price;
        this.setState({ btInUSD: a });
      });
    }
  };

  render() {
    const { send } = this.state;
    return (
      <div className="sendBody">
        <div className="inputs">
          <input
            id="receiver"
            className="inputSendID"
            placeholder="Address of reciever"
            type="text"
            disabled={send === Send.SENDING}
            onChange={e => this.setState({ receiver: e.target.value })}
            value={this.state.receiver}
          />
          <input
            id="inputAmountID"
            className="inputSendAmount"
            placeholder="$"
            type="number"
            min="0"
            onKeyDown={this.handleKeyDown}
            onChange={e => this.handleChange(e.target.value)}
            disabled={send === Send.SENDING}
            value={this.state.value}
          />
          <p className="satoshis">
            Amount in {this.state.coin === "tbtc" ? "BTC" : "LTC"}:{" "}
            {this.state.ammInBTC}
          </p>
          <div style={{ width: "100%" }}>
            <button
              id="sendButton"
              onClick={() => this.sendCash()}
              className="btnSend"
              disabled={send === Send.SENDING}
            >
              {send}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
