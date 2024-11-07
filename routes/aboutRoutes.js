const express = require('express');
const aboutController = require('../controllers/aboutController');
const router = express.Router();

router.get('/', aboutController.getAllAbouts);
router.get('/:id', aboutController.getAboutById);
router.post('/', aboutController.createAbout('ImageUpload'));
router.put('/:id', aboutController.updateAbout('ImageUpload'));
router.delete('/:id', aboutController.deleteAbout);

module.exports = router;
