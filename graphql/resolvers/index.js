// index.js
const userResolvers = require('./user');
const tournamentsResolvers = require('./tournaments');

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...tournamentsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...tournamentsResolvers.Mutation,
  },
  Subscription: {
    ...tournamentsResolvers.Subscription,
  },
};
