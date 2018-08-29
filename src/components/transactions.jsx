import React, { Component } from "react";
import "../css/transactions.css";

export default class Receive extends Component {
  state = {
    transactions: [],
    walletId: "",
    serverPath: ""
  };

  componentWillMount() {
    this.setState({ transactions: this.props.trans });
    this.setState({ walletId: this.props.wallID });
    this.setState({ serverPath: this.props.serverPath });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.trans !== prevProps.trans)
      this.setState({ transactions: this.props.trans });
  }

  render() {
    const { transactions } = this.state;
    let element = transactions.map(data => {
      return (
        <div key={data.id} id="tes" className="transactionsBody">
          <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
            <div className="receiverID">{data.outputs[0].address}</div>
            <p className="subText"> Receiver ID</p>
          </div>
          <p
            className="status"
            style={{
              backgroundColor: data.state === "confirmed" ? "green" : "#db9430"
            }}
          >
            {data.state}
          </p>
          <p className="amountSent">
            {data.usd.toFixed(2) < 0 ? "Amount spent" : "Amount received"}{" "}
            <br />
            <span style={{ color: data.usd.toFixed(2) < 0 ? "red" : "green" }}>
              ${data.usd.toFixed(2)}
            </span>
          </p>
        </div>
      );
    });
    return element;
  }
}
