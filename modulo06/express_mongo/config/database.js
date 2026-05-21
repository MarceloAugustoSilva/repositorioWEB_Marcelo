const mongoose = require('mongoose');

async function conectar() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('Variável MONGO_URI não definida. Configure o arquivo .env');
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado ao MongoDB Atlas');
  } catch (err) {
    console.error('❌ Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  }
}

module.exports = conectar;
