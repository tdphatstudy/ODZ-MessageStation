const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  type: {
    type: String,
    enum: ['audio', 'video'],
    required: true
  },
  status: {
    type: String,
    enum: ['started', 'ended'],
    default: 'started'
  },
  started_at: {
    type: Date,
    default: Date.now
  },
  ended_at: {
    type: Date
  }
});

module.exports = mongoose.model('Call', callSchema);