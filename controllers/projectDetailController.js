// controllers/projectDetailController.js
const ProjectDetail = require('../models/projectDetailModel');

exports.getAllProjectDetails = async (req, res) => {
  try {
    const projectDetails = await ProjectDetail.findAll();
    res.status(200).json(projectDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProjectDetail = async (req, res) => {
  try {
    const { project_id, title,title_en, description,description_en,sub_image } = req.body;
    const projectDetail = await ProjectDetail.create({ project_id, title,title_en, description,description_en,sub_image });
    res.status(201).json(projectDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add more CRUD operations as needed
