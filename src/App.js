import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import LogIn from "./components/login";
import NewWallet from "./components/newWallet";
import Home from "./components/home";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallId: ""
    };
    this.changeWallId = this.changeWallId.bind(this);
  }

  changeWallId(id) {
    this.setState({ wallId: id });
    console.log("oK" + id);
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route
            exact={true}
            path="/"
            render={() => <LogIn chngWallId={this.changeWallId} />}
          />
          <Route exact={true} path="/new" render={() => <NewWallet />} />
          <Route
            path="/home"
            render={() => <Home wallId={this.state.wallId} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
