const express = require('express');
const router = express.Router();
const socialLinkController = require('../controllers/SocialLinksController');

router.get('/', socialLinkController.getSocialLinks);
router.post('/', socialLinkController.createOrUpdateSocialLink);
router.delete('/:type', socialLinkController.deleteSocialLink);

module.exports = router;
