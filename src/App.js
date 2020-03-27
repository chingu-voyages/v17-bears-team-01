import React from 'react';
import './App.css';
import AppContext from './context/app-context.js';
import { Route } from 'react-router-dom';

import Landing from './components/landing/Landing';
import Join from './components/join/Join';
import Create from './components/create/create';

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

          <Route 
            exact
            path='/create'
            component={Create}
          />

        </div>
      </AppContext.Provider>
    );
  }
}

