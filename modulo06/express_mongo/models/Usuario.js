const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório'],
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
  senha: {
    type: String,
    required: [true, 'A senha é obrigatória'],
    minlength: [6, 'A senha deve ter pelo menos 6 caracteres']
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: 'Role deve ser "admin" ou "user"'
    },
    default: 'user'
  }
}, { timestamps: true });

// Hash automático da senha antes de salvar (pre save)
usuarioSchema.pre('save', async function () {
  if (!this.isModified('senha')) return;
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
});

// Método de instância para comparar senha
usuarioSchema.methods.compararSenha = function (senhaPlana) {
  return bcrypt.compare(senhaPlana, this.senha);
};

// Não retornar a senha em respostas JSON
usuarioSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.senha;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Usuario', usuarioSchema);
