// routes/projectDetailRoutes.js
const express = require('express');
const router = express.Router();
const projectDetailController = require('../controllers/projectDetailController');

router.get('/', projectDetailController.getAllProjectDetails);
router.post('/', projectDetailController.createProjectDetail);

// Add more routes as needed

module.exports = router;

