// routes/projectImageRoutes.js
const express = require('express');
const router = express.Router();
const projectImageController = require('../controllers/projectImageController');

router.get('/', projectImageController.getAllProjectImages);
router.post('/', projectImageController.createProjectImage);

// Add more routes as needed

module.exports = router;
