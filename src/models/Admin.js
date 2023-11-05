const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  faculty: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);
