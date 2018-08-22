import React, { Component } from "react";
import "../css/transactions.css";

export default class Receive extends Component {
  state = {
    transactions: [],
    walletId: ""
  };

  componentWillMount() {
    this.setState({ transactions: this.props.trans });
    this.setState({ walletId: this.props.wallID });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.trans !== prevProps.trans)
      this.setState({ transactions: this.props.trans });
  }

  render() {
    // return (
    //   <div className="transactionsBody">
    //     <div className="receiverID">
    //       v2x098b41c78c2232e8b732dd0958a9bec34f29b54155d145496d69d4cb0e76cd33
    //     </div>
    //     <p className="subText"> Receiver ID</p>

    //     <p className="amountSent">Amount sent: 1.4BTC</p>
    //   </div>
    // );
    const { transactions } = this.state;
    let element = transactions.map(data => {
      console.log(data);
      return (
        <div className="transactionsBody">
          <div className="receiverID">{data.outputs[0].address}</div>
          <p className="subText"> Receiver ID</p>

          <p className="amountSent">Amount sent: 1.4BTC</p>
        </div>
      );
    });
    return element;
  }
}
