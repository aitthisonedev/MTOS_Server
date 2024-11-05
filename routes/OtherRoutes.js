const express = require('express');
const router = express.Router();
const otherContentController = require('../controllers/OtherController');

router.get('/', otherContentController.getOtherContents);
router.post('/', otherContentController.createOrUpdateOtherContent);
router.delete('/:type', otherContentController.deleteOtherContent);

module.exports = router;
