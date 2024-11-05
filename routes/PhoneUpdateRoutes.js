const express = require('express');
const router = express.Router();
const phoneUpdateController = require('../controllers/PhoneUpdateController');

router.get('/', phoneUpdateController.getPhoneUpdate);
router.post('/', phoneUpdateController.createOrUpdatePhoneUpdate);
router.delete('/:type', phoneUpdateController.deletePhoneUpdate);

module.exports = router;
