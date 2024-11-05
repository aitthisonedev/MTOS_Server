const express = require('express');
const router = express.Router();
const LogopartnerController = require('../controllers/LogopartnersController');

router.get('/', LogopartnerController.getAllLogopartners);
router.get('/:id', LogopartnerController.getLogopartnerById);
router.post('/', LogopartnerController.createOrUpdateLogopartner('logopartners'));
router.delete('/:id', LogopartnerController.deleteLogopartner);

module.exports = router;
