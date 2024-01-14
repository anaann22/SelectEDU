import mongoose from 'mongoose';

const SemestruSchema = new mongoose.Schema({
  an: {
    type: Number,
    required: true
  },
  semestruI: {
    type: String
  },
  semestruII: {
    type: String
  }
});

const FacultateSchema = new mongoose.Schema({
  nume: {
    type: String,
    required: true,
    unique: true
  },
  specialitati: [{
    nume: {
      type: String,
      required: true
    },
    semestre: [SemestruSchema]
  }]
});

const TabelSchema = new mongoose.Schema({
  facultati: [FacultateSchema]
}, {
  timestamps: true
});

export default mongoose.model('Tabel', TabelSchema);
