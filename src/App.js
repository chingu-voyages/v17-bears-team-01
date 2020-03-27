import React from 'react';
import './App.css';
import AppContext from './context/app-context.js';
import { Route } from 'react-router-dom';

import Landing from './components/landing/Landing';
import Join from './components/join/Join';

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
            path='/join'
            component={Join}
          />

        </div>
      </AppContext.Provider>
    );
  }
}

