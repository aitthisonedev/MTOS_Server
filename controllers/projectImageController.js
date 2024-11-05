// controllers/projectImageController.js
const ProjectImage = require('../models/projectImageModel');

exports.getAllProjectImages = async (req, res) => {
  try {
    const projectImages = await ProjectImage.findAll();
    res.status(200).json(projectImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProjectImage = async (req, res) => {
  try {
    const { seq_id, image_link } = req.body;
    const projectImage = await ProjectImage.create({ seq_id, image_link });
    res.status(201).json(projectImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add more CRUD operations as needed
