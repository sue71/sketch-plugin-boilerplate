import * as React from 'react';

export default class App extends React.Component {
  render() {
    const style = {
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    };
    return (
      <div onClick={this.onClick} style={style}>
        Hello sketch plugin
      </div>
    );
  }
}
