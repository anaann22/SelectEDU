const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  nrMatricol: {
    type: String,
    required: true,
    unique: true
  },
  faculty: {
    type: String
  },
  yearOfStudy: {
    type: Number
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  materie1: {
    type: String
  },
  materie2: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
