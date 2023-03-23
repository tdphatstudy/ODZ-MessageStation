const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  gmail: {
    type: String,
    required: true,
    unique: true
  },
  zalo: {
    type: String,
    default: ""
  },
  fb: {
    type: String,
    default: ""
  },
  outlook: {
    type: String,
    default: ""
  },
  twitter: {
    type: String,
    default: ""
  },
  linkedin: {
    type: String,
    default: ""
  },
  github: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    required: true
  },
  old_passwords: {
    type: [String],
    default: []
  },
  online_status: {
    type: String, 
    enum: ["offline", "online", "meeting", "sleeping"],
    default: "offline"
  },
  account_status: {
    type: String,
    enum: ['inactivity', 'active', 'lock'],
    default: 'inactivity'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ["User", "Administrator","CustomerSupport"],
    required: true,
    default: "User"
  },
  device_manager: [{
    deviceId: {
      type: String,
      required: true
    },
    device: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['loggedin', 'loggedout', 'unknown']
    }
  }],
  update_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);