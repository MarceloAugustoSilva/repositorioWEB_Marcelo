const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

function gerarToken(usuario) {
  const payload = {
    id: usuario._id,
    email: usuario.email,
    role: usuario.role
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  });
}

async function registrar(req, res) {
  try {
    const { nome, email, senha, role } = req.body;

    // Por segurança, só permite criar "admin" se já houver autenticação admin (não exposto publicamente)
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha,
      role: role === 'admin' ? 'user' : role // bloqueia auto-promoção; admins são promovidos por outro admin
    });

    const token = gerarToken(novoUsuario);
    res.status(201).json({ usuario: novoUsuario, token });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ erro: 'Dados inválidos', detalhes: err.errors });
    }
    if (err.code === 11000) {
      return res.status(409).json({ erro: 'E-mail já cadastrado' });
    }
    res.status(500).json({ erro: 'Erro ao registrar usuário', detalhe: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ erro: 'E-mail e senha são obrigatórios' });
    }

    const usuario = await Usuario.findOne({ email: email.toLowerCase() });
    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const senhaOk = await usuario.compararSenha(senha);
    if (!senhaOk) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = gerarToken(usuario);
    res.json({ usuario, token });
  } catch (err) {
    res.status(500).json({ erro: 'Erro no login', detalhe: err.message });
  }
}

async function eu(req, res) {
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuário', detalhe: err.message });
  }
}

module.exports = { registrar, login, eu };
