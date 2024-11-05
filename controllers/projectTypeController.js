const ProjectType = require('../models/projectTypeModel');

exports.getAllProjectTypes = async (req, res) => {
  try {
    const projectTypes = await ProjectType.findAll();
    res.status(200).json(projectTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProjectType = async (req, res) => {
  try {
    const { type_name,type_name_en } = req.body;
    const projectType = await ProjectType.create({ type_name ,type_name_en});
    res.status(201).json(projectType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateType = async (req, res) => {
    const typeId = req.params.id;
    const { type_name,type_name_en } = req.body;
  
    try {
      const type = await ProjectType.findByPk(typeId);
  
      if (!type) {
        return res.status(404).json({ message: "Type not found" });
      }
      type.type_name = type_name || type.type_name;
      type.type_name_en = type_name_en || type.type_name_en; 
    
      await type.save();
  
      res.status(200).json({ message: "Type updated successfully", type });
    } catch (error) {
      console.error("Error updating user:", error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the user", error });
    }
  };

  exports.deleteType = async (req, res) => {
    const typeId = req.params.id;
  
    try {
      const type = await ProjectType.findByPk(typeId);
  
      if (!type) {
        return res.status(404).json({ message: "Project type not found" });
      }
  
      await type.destroy();
      res.status(200).json({ message: "Project type deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the user", error });
    }
  };