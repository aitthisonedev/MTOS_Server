const express = require('express');
const performanceController = require('../controllers/performanceController');
const router = express.Router();

router.get('/', performanceController.getAllPerformances);
router.post('/', performanceController.createPerformance('ImageUpload'));
router.put('/:id', performanceController.updatePerformance('ImageUpload'));
router.delete('/:id', performanceController.deletePerformance);

module.exports = router; 