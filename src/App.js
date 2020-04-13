import React from 'react';
import './App.module.scss';
import AppContext from './context/app-context.js';
import { Route } from 'react-router-dom';
import Login from './components/Views/Login/Login';
import Landing from './components/Views/Landing/Landing';
import Create from './components/Views/Create/Create';
import Join from './components/Views/Join/Join';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import CalendarView from './components/Views/Calendar/Calendar';
import Dashboard from './components/Views/Dashboard/Dashboard';
import AllTimes from './components/Views/AllTimes/AllTimes';
import FinalMeeting from './components/Views/FinalMeeting/FinalMeeting';

const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  connectToDevTools: true
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      authenticated: false,
      error: null,
      meetingLength: 0,
      userTimes: JSON.stringify(),
      timeArr: [],
      updateCalDays: (days) => {
        this.setState((state) => {
          state.timeArr.push(days);
        });
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
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error('failed to authenticate user');
      })
      .then((responseJson) => {
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
    // console.log(this.state.user);
    return (
      <ApolloProvider client={client}>
        <AppContext.Provider value={this.state}>
          <div className="#">
            <Route exact path="/" component={Landing} user={this.state.user} />

            <Route exact path="/login" component={Login} />

            <Route exact path="/create" component={Create} />

            <Route exact path="/join" component={Join} />

            <Route exact path="/dashboard" component={Dashboard} />

            <Route exact path="/create" component={Create} />

            <Route exact path="/calendar" component={CalendarView} />

            <Route exact path="/alltimes" component={AllTimes} />

            <Route exact path="/finalmeeting" component={FinalMeeting} />
          </div>
        </AppContext.Provider>
      </ApolloProvider>
    );
  }
}
