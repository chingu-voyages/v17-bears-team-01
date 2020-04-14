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
    type: String  // saved for non social auth 
  },
  name: {
    type: String
  },
  timezone: { 
    type: String, // saved for non social auth 
  },
  meetings: [{
    type: mongoose.Types.ObjectId,
    ref: 'Meeting',
    default: []
  }]
},{
  collection: 'users'
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
