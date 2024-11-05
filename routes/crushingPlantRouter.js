const express = require('express');
const crushingPlantController = require('../controllers/crushingPlantController');
const router = express.Router();

router.get('/', crushingPlantController.getAllCrushingPlants);
router.get('/:id', crushingPlantController.getCrushingPlantById);
router.post('/', crushingPlantController.createCrushingPlant('ImageUpload'));
router.put('/:id', crushingPlantController.updateCrushingPlant('ImageUpload'));
router.delete('/:id', crushingPlantController.deleteCrushingPlant);

module.exports = router;
