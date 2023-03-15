const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  callId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Call',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  socketId: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  port: {
    type: Number,
    required: true
  },
  offer: {
    type: Object,
    required: true
  },
  answer: {
    type: Object,
    required: false
  }
});

module.exports = mongoose.model('Connection', connectionSchema);
