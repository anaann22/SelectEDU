import mongoose from 'mongoose';

const MaterieSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
    unique: true
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
    required: true
  },
  Profesor_Prenume: {
    type: String,
    required: true
  },
  Semestru: {
    type: String,
    enum: ['Semestrul I', 'Semestrul II'], 
    required: true
  },
  numarAlegeri: {
    type: Number,
    default: 0,
  },
  numarMaximUtilizatori: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

export default mongoose.model('Materie', MaterieSchema);
