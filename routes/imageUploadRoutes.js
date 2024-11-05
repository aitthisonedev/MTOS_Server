const express = require('express');
const router = express.Router();
const imageUploadController = require('../controllers/imageUploadController');

// Define routes
router.get('/:type', imageUploadController.getImageUpload);
router.post('/', imageUploadController.createOrUpdateImageUpload);
router.delete('/:type', imageUploadController.deleteImageUpload);
router.post('/upload', imageUploadController.imageUpload.single('image'), imageUploadController.uploadImage);

module.exports = router;