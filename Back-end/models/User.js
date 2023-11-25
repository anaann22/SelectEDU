import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  Nume: {
    type: String,
    required: true
  },
  Prenume: {
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
  password: {
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

export default mongoose.model('User', UserSchema);