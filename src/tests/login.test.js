import Login from "../components/login";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe("Log in test", () => {
  let props = {
    chngWallId: jest.fn(),
    chngWallCoin: jest.fn()
  };
  let logInScreen = shallow(<Login {...props} />);

  test("If log in button changes text when pressed", () => {
    expect(logInScreen.find("#btnLID").text()).toEqual("Log in");

    logInScreen.find("#btnLID").simulate("click");

    expect(logInScreen.find("#btnLID").text()).toEqual("Logging in");
  });

  test("If currency button changes props", () => {
    logInScreen.find("#btnType1").simulate("click");

    expect(logInScreen.state("coin")).toEqual("tbtc");

    logInScreen.find("#btnType2").simulate("click");

    expect(logInScreen.state("coin")).toEqual("tltc");
  });
});
