const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');
const validarTarefa = require('../middlewares/validarTarefa');

router.get('/', tarefaController.listar);
router.get('/:id', tarefaController.buscarPorId);
router.post('/', validarTarefa, tarefaController.criar);
router.put('/:id', validarTarefa, tarefaController.atualizar);
router.delete('/:id', tarefaController.remover);

module.exports = router;
