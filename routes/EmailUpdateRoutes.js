const express = require('express');
const router = express.Router();
const emailUpdateController = require('../controllers/EmailUpdateController');

router.get('/', emailUpdateController.getEmailUpdate);
router.post('/', emailUpdateController.createOrUpdateEmailUpdate);
router.delete('/:type', emailUpdateController.deleteEmailUpdate);

module.exports = router;
