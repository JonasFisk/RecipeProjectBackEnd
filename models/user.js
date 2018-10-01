const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    required: true,
    trim: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};
