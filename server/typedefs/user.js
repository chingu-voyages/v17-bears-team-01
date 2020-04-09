const { gql } = require('apollo-server-express');

//TODO: mutations: update, delete user
module.exports = gql`
  type Query {
    getUser: User
  }

  type Mutation {
    register(
      email: String!
      password: String!
      name: String!
      timezone: String!
    ): User
    login(provider: String!, email: String!, password: String!): User
    logout: Boolean
  }

  type User {
    id: ID!
    email: String!
    password: String!
    name: String!
    timezone: String!
    meetings: [Meeting!]!
  }
`;
