const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome do curso é obrigatório'],
    trim: true,
    unique: true
  },
  descricao: {
    type: String,
    trim: true,
    default: ''
  },
  cargaHoraria: {
    type: Number,
    min: [1, 'A carga horária deve ser maior que zero'],
    default: 40
  }
}, { timestamps: true });

module.exports = mongoose.model('Curso', cursoSchema);
