const mongoose = require('mongoose');

const groupChatSchema = new mongoose.Schema({
  name: {
    name_type: {
      type: String,
      enum: ['normal', 'refs'],
      required: true
    }, 
    content_name: {
      type: String
    }

  },
  avatar: {
    type: String,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  type: {
    type: String,
    enum: ['Relationship', 'Public'],
    required: true,
    default: 'Relationship'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Group = mongoose.model('GroupChat', groupChatSchema);
module.exports = Group;