import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        user: "test"
      }
  }

  render() {
    return (
      <div>
        <p>{this.state.user}</p>
      </div>
    )
  }
}

