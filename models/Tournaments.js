// models/Tournament.js
const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  username: String,
  isAdmin: Boolean,
});

const tournamentSchema = new mongoose.Schema({
  roomId: String,
  creatorUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  creatorName: String, // New field for the creator's name
  settings: String, // Adjust this based on your requirements
  participants: [participantSchema],
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
