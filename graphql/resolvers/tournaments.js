// tournaments.js
const Tournament = require('../../models/Tournaments');
const User = require('../../models/User');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const { v4: uuidv4 } = require('uuid');

module.exports = {
  Mutation: {
    createTournament: async (_, { creatorUserId }) => {
      const randomRoomNumber = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
      const roomId = randomRoomNumber;
      const creatorUser = await User.findById(creatorUserId);

      if (!creatorUser) {
        throw new Error('Creator user not found');
      }

      const newTournament = new Tournament({
        roomId,
        creatorUserId,
        creatorName: creatorUser.username, // Set the creatorName from the creatorUser
        participants: [
          {
            userId: creatorUserId,
            username: creatorUser.username,
            isAdmin: true,
          },
        ],
      });

      await newTournament.save();

      return newTournament;
    },

    updateTournament: async (_, { roomId, settings, participants }) => {
      return await Tournament.findOneAndUpdate(
        { roomId },
        { $set: { settings, participants } },
        { new: true }
      );
    },

    deleteTournament: async (_, { roomId }) => {
      await Tournament.deleteOne({ roomId });
      return true;
    },

    joinTournament: async (_, { roomId, userId, username }) => {
      const tournament = await Tournament.findOne({ roomId });

      if (!tournament) {
        throw new Error('Tournament not found');
      }

      const isAdmin = tournament.creatorUserId === userId;

      tournament.participants.push({
        userId,
        username,
        isAdmin,
      });

      await tournament.save();

      pubsub.publish(`TOURNAMENT_UPDATED_${roomId}`, { tournamentUpdated: tournament });

      return tournament;
    },
  },

  Subscription: {
    tournamentUpdated: {
      subscribe: (_, { roomId }) => pubsub.asyncIterator([`TOURNAMENT_UPDATED_${roomId}`]),
    },
  },

  Query: {
    getTournament: async (_, { roomId }) => {
      return await Tournament.findOne({ roomId });
    },

    getTournaments: async (_) => {
      const tournaments = await Tournament.find({});
      return tournaments;
    },
  },
};
