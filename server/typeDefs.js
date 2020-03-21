const { gql } = require("apollo-server-express");

module.exports.typeDefs = gql`
    type Query {
      hello: String
    }
  `;