const mongoose = require('mongoose');

const relationshipSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['sending', 'pending', 'friend', 'unfriend'],
    default: 'pending'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Relationship', relationshipSchema);