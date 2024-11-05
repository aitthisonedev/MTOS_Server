const express = require('express');
const testimonialController = require('../controllers/testimonialController');
const router = express.Router();

router.get('/', testimonialController.getAllTestimonials);
router.post('/', testimonialController.createTestimonial('ImageUpload'));
router.put('/:id', testimonialController.updateTestimonial('ImageUpload'));
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;
