const express = require('express');
const contentFourController = require('../controllers/contentFourController');
const router = express.Router();

router.get('/', contentFourController.getAllContentFours);
router.post('/', contentFourController.createContentFour('ImageUpload'));
router.put('/:id', contentFourController.updateContentFour('ImageUpload'));
router.delete('/:id', contentFourController.deleteContentFour);

module.exports = router; 