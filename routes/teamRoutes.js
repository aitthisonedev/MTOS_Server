const express = require('express');
const teamController = require('../controllers/teamController');
const router = express.Router();

router.get('/', teamController.getAllTeamMembers);
router.get('/:id', teamController.getTeamMemberById);
router.post('/', teamController.createTeamMember('ImageUpload'));
router.put('/:id', teamController.updateTeamMember('ImageUpload'));
router.delete('/:id', teamController.deleteTeamMember);

module.exports = router;
