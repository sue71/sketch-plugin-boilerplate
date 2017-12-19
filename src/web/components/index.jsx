import * as React from "react";
import * as ReactDOM from "react-dom";
import AppContainer from "./AppContainer";

require("../index.html");
require("antd/dist/antd.css");

const appContainer = ReactDOM.render(
  <AppContainer />,
  document.getElementById("app")
);

// Javascript bridge called by sketch script
window.bridge = action => {
  console.log(action);
  switch (action.type) {
    case "loadLayers":
      appContainer.setState({
        layers: action.payload
      });
      break;
  }
};
