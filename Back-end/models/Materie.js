import mongoose from 'mongoose';

const MaterieSchema = new mongoose.Schema({
  Nume_Materie: {
    type: String,
    required: true
  },
  Cod_Materie: {
    type: Number,
    required: true,
    unique: true
  },
  Profesor_Email: {
    type: String,
    required: true,
    unique: false
  },
  Faculty: {
    type: String,
    required: true
  },
  Poza_Materie: {
    type: String, 
    required: true
  },
  Profesor_Nume: {
    type: String,
    required: true,
    unique: false
  },
  Profesor_Prenume: {
    type: String,
    required: true,
    unique: false
  },
  Semestru: {
    type: String,
    enum: ['Semestrul I', 'Semestrul II'], 
    required: true
  },
}, {
  timestamps: true
});

export default mongoose.model('Materie', MaterieSchema);