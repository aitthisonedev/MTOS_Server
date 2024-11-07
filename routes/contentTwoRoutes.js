const express = require('express');
const contentTwoController = require('../controllers/contentTwoController');
const router = express.Router();

// Define routes
router.get('/', contentTwoController.getAllContentTwos);
router.post('/', contentTwoController.createContentTwo('ImageUpload'));
router.put('/:id', contentTwoController.updateContentTwo('ImageUpload'));
router.delete('/:id', contentTwoController.deleteContentTwo);

module.exports = router; 