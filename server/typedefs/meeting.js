const { gql } = require('apollo-server-express');

//future: updateMeeting
module.exports = gql `
  extend type Query {
    getMeeting(id: ID!): Meeting,
    getMeetings: [Meeting],
    getJoinMeetings: [Meeting]
  }

  extend type Mutation {
    createMeeting(title: String!, description: String!, duration: Int!, timezone: String!, availability: [Int!]!, participants: [String!]!): Meeting
    updateMeeting(title: String!, description: String!, duration: Int!, timezone: String!, availability: [Int!]!, participants: [String!]!): Meeting
    joinMeeting(id: ID!, intervals: [Int]!): Meeting
    deleteMeeting(id: String!): Boolean
  }
  type Meeting {
    id: ID!,
    author: String!,
    title: String!,
    description: String,
    duration: Int!,
    timezone: String!,
    availability: [Int!]!,
    participants: [Participant!]!
  }

  type Participant {
    user_id: String,
    intervals: [Int!]!,
    joined: Boolean
  }
`;