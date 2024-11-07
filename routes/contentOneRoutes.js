const express = require('express');
const contentOneController = require('../controllers/contentOneController');
const router = express.Router();

router.get('/', contentOneController.getAllContentOnes);
router.post('/', contentOneController.createContentOne('ImageUpload'));
router.put('/:id', contentOneController.updateContentOne('ImageUpload'));
router.delete('/:id', contentOneController.deleteContentOne);

module.exports = router; 