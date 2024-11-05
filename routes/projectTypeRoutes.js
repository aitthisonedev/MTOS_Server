// routes/projectTypeRoutes.js
const express = require('express');
const router = express.Router();
const projectTypeController = require('../controllers/projectTypeController');

router.get('/', projectTypeController.getAllProjectTypes);
router.post('/', projectTypeController.createProjectType);
router.put('/:id', projectTypeController.updateType);
router.delete('/:id', projectTypeController.deleteType);

// Add more routes as needed

module.exports = router;
