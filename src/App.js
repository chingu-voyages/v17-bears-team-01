import React from 'react';
import './App.css';
import AppContext from './context/app-context.js';
import { Route } from 'react-router-dom';
import Login from './components/Login/Login';

import Landing from './components/landing/Landing';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'test'
    };
  }
 
  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div className='#'>

          <Route 
            exact
            path='/'
            component={Landing}
          />

          <Route
            exact
            path="/login"
            component={Login}
          />

        </div>
      </AppContext.Provider>
    );
  }
}

