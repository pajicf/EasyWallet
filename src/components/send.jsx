import React, { Component } from "react";
import "../css/send.css";
import Axios from "axios";

export default class send extends Component {
  state = {
    walletID: "",
    ammInBTC: 0,
    btInUSD: 0,
    coin: ""
  };

  componentWillMount() {
    this.setState({ walletID: this.props.wallID });
    this.setState({ coin: this.props.coin });
  }

  sendCash = () => {
    let amUSD = document.getElementById("inputAmountID").value;
    let amBTC = amUSD / this.state.btInUSD;
    let amSmlUnit = amBTC * 1e8;
    let rec = document.getElementById("receiver").value;
    console.log(amSmlUnit + " " + this.props.balance);
    if (amSmlUnit <= 0 || rec === "" || amSmlUnit >= this.props.balance) {
      alert("Addres or amount is not valid");
    } else {
      document.getElementById("inputAmountID").disabled = true;
      document.getElementById("receiver").disabled = true;
      document.getElementById("sendButton").disabled = true;
      document.getElementById("sendButton").innerHTML = "Sending";
      document.getElementById("sendButton").style.backgroundColor = "#BDBDBD";
      Axios.post("http://localhost:8080/wallet/send", {
        amount: Math.round(amSmlUnit),
        address: rec,
        walletId: this.state.walletID,
        coin: this.state.coin
      })
        .then(res => {
          console.dir(res);
          if (res.data.error === "err") {
            this.handleSendChange();
            alert("Invalid address!");
          } else {
            this.handleSendChange();
            alert("Your transaction has been submitted and is now pending!");
          }
        })
        .catch(error => {
          this.handleSendChange();
          alert(
            "Error while submitting transaction! Please check your internet connection, your funds and try again later!"
          );
        });
    }
  };

  handleSendChange() {
    document.getElementById("sendButton").style.backgroundColor = "#393e46";
    document.getElementById("sendButton").disabled = false;
    document.getElementById("inputAmountID").disabled = false;
    document.getElementById("receiver").disabled = false;
    document.getElementById("sendButton").innerHTML = "Send";
    document.getElementById("receiver").value = null;
    document.getElementById("inputAmountID").value = null;
    this.setState({ ammInBTC: 0 });
  }

  handleChange = () => {
    document.getElementById("inputAmountID").onkeydown = function(e) {
      if (
        !(
          (e.keyCode > 95 && e.keyCode < 106) ||
          (e.keyCode > 47 && e.keyCode < 58) ||
          e.keyCode === 8
        )
      ) {
        return false;
      }
    };
    let conv =
      document.getElementById("inputAmountID").value / this.state.btInUSD;

    this.setState({ ammInBTC: conv.toFixed(8) });
  };

  componentDidMount() {
    this.getBitInUSD();
    setInterval(this.getBitInUSD, 30000);
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
    return (
      <div className="sendBody">
        <div className="inputs">
          <input
            id="receiver"
            className="inputSendID"
            placeholder="Address of reciever"
            type="text"
          />
          <input
            id="inputAmountID"
            className="inputSendAmount"
            placeholder="$"
            type="number"
            min="0"
            onChange={() => this.handleChange()}
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
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}
