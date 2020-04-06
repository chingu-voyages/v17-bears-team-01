const { gql } = require('apollo-server-express');

//TODO: Join Meeting, Validation
module.exports = gql `
  extend type Query {
    getMeeting(id: ID!): Meeting,
  }

  extend type Mutation {
    createMeeting(title: String!, description: String, duration: Int!, timezone: String!, availability: [Int!]!, participants: [String!]!): Meeting
    updateMeeting(title: String, description: String, duration: Int, timezone: String, availability: [String], participants: [ID]): Meeting
    deleteMeeting(id: String!): Boolean
  }
  type Meeting {
    id: ID!,
    author: User!,
    title: String!,
    description: String!,
    duration: Int!,
    timezone: String!,
    availability: [Int!]!,
    participants: [Participant!]!
  }

  type Participant {
    user_id: User,
    intervals: [Int!]!
  }
`