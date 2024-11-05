const express = require('express');
const router = express.Router();
const BannersController = require('../controllers/BranersController');

router.get('/', BannersController.getBanners);
router.post('/', BannersController.createOrUpdateBanners);
router.delete('/:type', BannersController.deleteBanners);

module.exports = router;
