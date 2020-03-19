import React from 'react';
import './App.css';
import AppContext from './context/app-context.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        user: "test"
      }
  }
 
  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div>
          <p>{this.state.user}</p>
        </div>
      </AppContext.Provider>
    )
  }
}

