const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.post('/registrar', authController.registrar);
router.post('/login', authController.login);
router.get('/eu', auth, authController.eu);

module.exports = router;
