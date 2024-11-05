// // routes/projectRoutes.js
// const express = require('express');
// const router = express.Router();
// const projectController = require('../controllers/projectController');
// const folder = 'projects';

// router.get('/', projectController.getAllProjects);
// router.get('/getById/:id',projectController.getProjectByID);
// router.post('/', projectController.createProject(folder));
// router.delete('/:id',projectController.deleteProject);

// // Add more routes as needed

// module.exports = router;

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

const folder = 'projects';

router.get('/', projectController.getAllProjects);
router.get('/getById/:id', projectController.getProjectById);
router.post('/', projectController.createProject(folder));
router.put('/:id', projectController.updateProject(folder));
router.delete('/:id', projectController.deleteProject);

module.exports = router;

