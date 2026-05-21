const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
const auth = require('../middlewares/auth');
const autorizar = require('../middlewares/autorizar');

// Todas as rotas de alunos exigem autenticação
router.use(auth);

router.get('/', alunoController.listar);
router.get('/:id', alunoController.buscarPorId);
router.post('/', alunoController.criar);
router.put('/:id', alunoController.atualizar);

// Apenas admin pode remover (desafio extra: autorização por role)
router.delete('/:id', autorizar('admin'), alunoController.remover);

module.exports = router;
