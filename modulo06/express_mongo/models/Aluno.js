const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome do aluno é obrigatório'],
    trim: true,
    minlength: [2, 'O nome deve ter pelo menos 2 caracteres']
  },
  email: {
    type: String,
    required: [true, 'O e-mail é obrigatório'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'E-mail inválido']
  },
  idade: {
    type: Number,
    min: [1, 'Idade deve ser maior que zero'],
    max: [120, 'Idade inválida']
  },
  curso: {
    type: String,
    required: [true, 'O curso é obrigatório'],
    trim: true
  },
  cursoRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso'
  },
  ativo: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Aluno', alunoSchema);
