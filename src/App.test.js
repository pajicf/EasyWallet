import React from "react";
import ReactDOM from "react-dom";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import App from "./App";
import Login from "./components/login";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("If log in button changes text when pressed", () => {
  let props = {
    chngWallId: jest.fn(),
    chngWallCoin: jest.fn()
  };
  let logInScreen = shallow(<Login {...props} />);

  expect(logInScreen.find("#btnLID").text()).toEqual("Log in");

  logInScreen.find("#btnLID").simulate("click");

  expect(logInScreen.find("#btnLID").text()).toEqual("Logging in");
});
