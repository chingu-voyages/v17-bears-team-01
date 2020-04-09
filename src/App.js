import React from 'react';
import './App.module.scss';
import AppContext from './context/app-context.js';
import { Route } from 'react-router-dom';
import Login from './components/Views/Login/Login';
import Landing from './components/Views/Landing/Landing';
import Create from './components/Views/Create/Create';
import Calendar from './components/Views/Calendar/Calendar';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

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
    client
      .query({
        query: gql`
          {
            getUser {
              email
              id
            }
          }
        `
      })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }

  render() {
    console.log(this.state.user);
    return (
      <AppContext.Provider value={this.state}>
        <div className="#">
          <Route exact path="/" component={Landing} user={this.state.user} />

          <Route exact path="/login" component={Login} />

          <Route exact path="/create" component={Create} />

          <Route exact path="/calendar" component={Calendar} />
        </div>
      </AppContext.Provider>
    );
  }
}
