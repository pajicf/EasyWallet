import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import LogIn from "./components/login";
import NewWallet from "./components/newWallet";
import Home from "./components/home";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={() => <LogIn />} />
          <Route exact={true} path="/new" render={() => <NewWallet />} />
          <Route exact={true} path="/home" render={() => <Home />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
