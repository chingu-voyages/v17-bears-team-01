import React from 'react';
import './App.module.scss';
import AppContext from './context/app-context.js';
import { Route } from 'react-router-dom';
import Login from './components/Views/Login/Login';
import Landing from './components/Views/Landing/Landing';
import Create from './components/Views/Create/Create';
import CalendarView from './components/Views/Calendar/Calendar';
import dummyTimes from '../src/dummyData';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      authenticated: false,
      error: null,
      meetingLength: 0,
      userTimes: JSON.stringify(dummyTimes),
      timeArr: [],
      updateCalDays: (days) => {
        this.setState((state) => {
          state.timeArr.push(days)
      })
      }
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
      .catch(() => {
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
        <div className="#">
          <Route exact path="/" component={Landing} user={this.state.user} />

          <Route exact path="/login" component={Login} />

          <Route exact path="/create" component={Create} />

          <Route exact path="/calendar" component={CalendarView} />
        </div>
      </AppContext.Provider>
    );
  }
}
