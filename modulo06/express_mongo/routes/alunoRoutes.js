const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.get('/', alunoController.listar);
router.get('/:id', alunoController.buscarPorId);
router.post('/', alunoController.criar);
router.put('/:id', alunoController.atualizar);
router.delete('/:id', alunoController.remover);

module.exports = router;
