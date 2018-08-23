import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import LogIn from "./components/login";
import NewWallet from "./components/newWallet";
import Home from "./components/home";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallId: "",
      coin: ""
    };
    this.changeWallId = this.changeWallId.bind(this);
    this.changeWallCoin = this.changeWallCoin.bind(this);
  }

  changeWallId(id) {
    this.setState({ wallId: id });
  }
  changeWallCoin(coin) {
    this.setState({ coin: coin });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route
            exact={true}
            path="/"
            render={() => (
              <LogIn
                chngWallId={this.changeWallId}
                chngWallCoin={this.changeWallCoin}
              />
            )}
          />
          <Route exact={true} path="/new" render={() => <NewWallet />} />
          <Route
            path="/home"
            render={() => (
              <Home wallId={this.state.wallId} coin={this.state.coin} />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
