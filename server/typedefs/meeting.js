const { gql } = require('apollo-server-express');

//TODO: Validation, Auth
module.exports = gql `
  extend type Query {
    getMeeting(id: ID!): Meeting,
  }

  extend type Mutation {
    createMeeting(title: String!, description: String!, duration: Int!, timezone: String!, availability: [String!]!, participants: [ID!]!): Meeting
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
    availability: [Interval!]!,
    participants: [Participant!]!
  }

  type Interval {
    from: String!,
    to: String
  }

  type Participant {
    user_id: User,
    intervals: Interval
  }
`