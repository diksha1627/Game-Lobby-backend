// schema.js
const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    username: String!
  }

  type Participant {
    id: ID!
    userId: ID!
    username: String!
    isAdmin: Boolean!
  }

  type Tournament {
    id: ID!
    roomId: String!
    creatorUserId: ID!
    creatorName: String! # New field for the creator's name
    settings: String
    participants: [Participant]
  }

  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
    getTournament(roomId: String!): Tournament
    getTournaments: [Tournament]
  }

  type Mutation {
    createUser(username: String!): User
    createTournament(creatorUserId: ID!): Tournament
    updateTournament(roomId: String!, settings: String, participants: [String]): Tournament
    deleteTournament(roomId: String!): Boolean
    joinTournament(roomId: String!, userId: ID!, username: String!): Tournament
  }

  type Subscription {
    tournamentUpdated(roomId: String!): Tournament
  }
`;
