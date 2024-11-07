const express = require('express');
const prosesController = require('../controllers/prosesController');
const router = express.Router();

router.get('/', prosesController.getAllProses);
router.post('/', prosesController.createProses);
router.put('/:id', prosesController.updateProses);
router.delete('/:id', prosesController.deleteProses);

module.exports = router; 