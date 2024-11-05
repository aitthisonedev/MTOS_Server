const Project = require('../models/projectModel');
const fs = require('fs');
const path = require('path');
const createImageUpload = require('../configs/multerConfig');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({ where: { project_id: id } });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    console.error('Error fetching project by ID:', err);
    res.status(500).json({ error: err.message });
  }
};

// Create project
exports.createProject = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.fields([{ name: 'coverImg', maxCount: 1 }, { name: 'subImgs', maxCount: 10 }]),
    async (req, res) => {
      try {
        const { projectName_en, projectName_lo, location_en, location_lo, title_en, title_lo, description_en, description_lo, moreDescription_en, moreDescription_lo, content_one, content_two, content_three, status, projectType } = req.body;
        const coverImg = req.files['coverImg'] ? req.files['coverImg'][0].filename : null;
        const subImgs = req.files['subImgs'] ? req.files['subImgs'].map(file => file.filename) : [];

        let userId;
        try {
          const token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          userId = decoded.id;
        } catch (error) {
          return res.status(401).json({ error: 'Invalid or missing token' });
        }
        if (!userId) {
          return res.status(400).json({ error: "User ID is missing in token" });
        }

        const project = await Project.create({
          coverImg: coverImg ? path.join(folder, coverImg) : null,
          subImgs: subImgs.map(img => path.join(folder, img)),
          projectName_en,
          projectName_lo,
          location_en,
          location_lo,
          title_en,
          title_lo,
          description_en,
          description_lo,
          moreDescription_en,
          moreDescription_lo,
          content_one,
          content_two,
          content_three,
          status,
          projectType,
          user_id: userId
        });

        res.status(201).json(project);
      } catch (err) {
        console.error('Error creating project:', err);
        res.status(500).json({ error: err.message });
      }
    }
  ];
};

// Update project
exports.updateProject = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.fields([{ name: 'coverImg', maxCount: 1 }, { name: 'subImgs', maxCount: 10 }]),
    async (req, res) => {
      try {
        const { id } = req.params;
        const { projectName_en, projectName_lo, location_en, location_lo, title_en, title_lo, description_en, description_lo, moreDescription_en, moreDescription_lo, content_one, content_two, content_three, status, projectType } = req.body;
        const coverImg = req.files['coverImg'] ? req.files['coverImg'][0].filename : null;


        const subImgs = req.files['subImgs'] ? req.files['subImgs'].map(file => file.filename) : [];

        const existingProject = await Project.findOne({ where: { project_id: id } });

        if (!existingProject) {
          return res.status(404).json({ error: 'Project not found' });
        }

        if (coverImg) {
          existingProject.coverImg = path.join(folder, coverImg);
        }

        if (subImgs.length > 0) {
          existingProject.subImgs = subImgs.map(img => path.join(folder, img));
        }

        existingProject.projectName_en = projectName_en || existingProject.projectName_en;
        existingProject.projectName_lo = projectName_lo || existingProject.projectName_lo;
        existingProject.location_en = location_en || existingProject.location_en;
        existingProject.location_lo = location_lo || existingProject.location_lo;
        existingProject.title_en = title_en || existingProject.title_en;
        existingProject.title_lo = title_lo || existingProject.title_lo;
        existingProject.description_en = description_en || existingProject.description_en;
        existingProject.description_lo = description_lo || existingProject.description_lo;
        existingProject.moreDescription_en = moreDescription_en || existingProject.moreDescription_en;
        existingProject.moreDescription_lo = moreDescription_lo || existingProject.moreDescription_lo;
        existingProject.content_one = content_one || existingProject.content_one;
        existingProject.content_two = content_two || existingProject.content_two;
        existingProject.content_three = content_three || existingProject.content_three;
        existingProject.status = status || existingProject.status;
        existingProject.projectType = projectType || existingProject.projectType;

        await existingProject.save();

        res.status(200).json(existingProject);
      } catch (err) {
        console.error('Error updating project:', err);
        res.status(500).json({ error: err.message });
      }
    }
  ];
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.destroy({
      where: { project_id: id }
    });
    if (deleted) {
      res.status(204).send("Project deleted");
    } else {
      throw new Error("Project not found");
    }
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: err.message });
  }
};