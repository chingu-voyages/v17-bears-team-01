const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  id: {
    type: String,
    default: mongoose.Types.ObjectId,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  timezone: { 
    type: String,
    required: true
  },
  meetings: [{
    type: mongoose.Types.ObjectId,
    ref: 'Meeting',
    default: []
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
