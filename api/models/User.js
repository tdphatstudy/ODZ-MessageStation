const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  idname: {
    type: String,
    required: true
  },
  gmail: {
    type: String,
    required: true
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
  created_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);