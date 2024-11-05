const express = require("express");
const router = express.Router();
const serviceDescriptionController = require("../controllers/serviceDescriptionsController");

router.get("/", serviceDescriptionController.getAllServiceDescriptions);
router.post("/", serviceDescriptionController.updateServiceDescriptions);

module.exports = router;
