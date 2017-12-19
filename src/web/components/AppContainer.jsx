import * as React from "react";
import { LayerList } from "./LayerList";
import { LocaleProvider, Input } from "antd";
import jaJP from "antd/lib/locale-provider/ja_JP";
import call from "sketch-module-web-view/client";

export default class AppContainer extends React.Component {
  state = {
    layers: []
  };

  render() {
    const { layers } = this.state;
    const style = {
      width: "100%",
      height: "100%",
      overflow: "hidden",
      boxSizing: "border-box"
    };

    return (
      <LocaleProvider locale={jaJP}>
        <div style={style}>
          <Input.Search placeholder="Input text" onSearch={this.onSearch} />
          <LayerList layers={layers} />
        </div>
      </LocaleProvider>
    );
  }

  onSearch(value) {
    call("didSearchByText", value);
  }
}
