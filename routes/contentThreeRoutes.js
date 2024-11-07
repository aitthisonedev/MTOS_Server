const express = require('express');
const contentThreeController = require('../controllers/contentThreeController');
const router = express.Router();

router.get('/', contentThreeController.getAllContentThrees);
router.post('/', contentThreeController.createContentThree('ImageUpload'));
router.put('/:id', contentThreeController.updateContentThree('ImageUpload'));
router.delete('/:id', contentThreeController.deleteContentThree);

module.exports = router; 