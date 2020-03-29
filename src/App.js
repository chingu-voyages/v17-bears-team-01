import React from 'react';
import './App.css';
import AppContext from './context/app-context.js';
import { Route } from 'react-router-dom';
import Login from './components/Login/Login';
// eslint-disable-next-line no-unused-vars
import Axios from 'axios';
import Landing from './components/landing/Landing';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      authenticated: false,
      error: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:4000/auth/login/success', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error('failed to authenticate user');
      })
      .then(responseJson => {
        this.setState({
          authenticated: true,
          user: responseJson.user
        });
      })
      // eslint-disable-next-line no-unused-vars
      .catch(error => {
        this.setState({
          authenticated: false,
          error: 'Failed to authenticate user'
        });
      });
  }

  render() {
    console.log(this.state.user);
    return (
      <AppContext.Provider value={this.state}>
        <div className='#'>

          <Route 
            exact
            path='/'
            component={Landing}
            user={this.state.user}
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

