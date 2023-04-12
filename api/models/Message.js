const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    revGroupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GroupChat',
      required: true
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    },
    attachments: [
      {
        attachments_type: {
          type: String,
          enum: ['link', 'image','video', 'gif', 'emoji', 'location']
        },
        attachments_content: {
          type: String
        }
      }
    ],
    visible_status: {
      type: String,
      enum: ['visible', 'unvisible'],
      default: 'visible'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
module.exports = mongoose.model('Message', messageSchema);