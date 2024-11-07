const express = require('express');
const slidePerformanceController = require('../controllers/slidePerformanceController');
const router = express.Router();

router.get('/', slidePerformanceController.getAllSlidePerformances);
router.post('/', slidePerformanceController.createSlidePerformance('ImageUpload'));
router.put('/:id', slidePerformanceController.updateSlidePerformance('ImageUpload'));
router.delete('/:id', slidePerformanceController.deleteSlidePerformance);

module.exports = router; 