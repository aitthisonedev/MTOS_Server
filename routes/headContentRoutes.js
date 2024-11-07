const express = require('express');
const headContentController = require('../controllers/headContentController');
const router = express.Router();

router.get('/', headContentController.getAllHeadContents);
router.post('/', headContentController.createHeadContent('ImageUpload'));
router.put('/:id', headContentController.updateHeadContent('ImageUpload'));
router.delete('/:id', headContentController.deleteHeadContent);

module.exports = router; 