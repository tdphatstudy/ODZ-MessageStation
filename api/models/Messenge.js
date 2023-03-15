const messageSchema = new mongoose.Schema({
    chatRoomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatRoom',
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
        type: String,
        required: true
      }
    ],
    metadata: {
      type: Object
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });