const express = require('express');
const router = express.Router();
const GroupCompanyController = require('../controllers/GroupCompanyController');

router.get('/', GroupCompanyController.getAllGroupCompanies);
router.get('/:id', GroupCompanyController.getGroupCompanyById);
router.post('/', GroupCompanyController.createOrUpdateGroupCompany('groupcompanies'));
router.delete('/:id', GroupCompanyController.deleteGroupCompany);

module.exports = router;
