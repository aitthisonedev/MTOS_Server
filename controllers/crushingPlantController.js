const CrushingPlant = require("../models/crushingPlantModel");
const fs = require("fs");
const path = require("path");
const createImageUpload = require("../configs/multerConfig");

// Get all crushing plants
exports.getAllCrushingPlants = async (req, res) => {
  try {
    const plants = await CrushingPlant.findAll();
    const baseResponse = plants.map(plant => {
      return {
        ...plant.toJSON(),
        image: plant.image ? `/ImageUpload/${plant.image}` : null,
      };
    });
    res.json(baseResponse);
  } catch (err) {
    console.error('Error fetching crushing plants:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get crushing plant by ID
exports.getCrushingPlantById = async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await CrushingPlant.findOne({ where: { id } });

    if (!plant) {
      return res.status(404).json({ error: "Crushing plant not found" });
    }

    const imagePath = plant.image
      ? `/ImageUpload/${plant.image}`
      : null;

    const response = {
      ...plant.toJSON(),
      image: imagePath,
    };

    res.json(response);
  } catch (err) {
    console.error("Error fetching crushing plant by ID:", err);
    res.status(500).json({ error: err.message });
  }
};

// Create crushing plant
exports.createCrushingPlant = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single("image"),
    async (req, res) => {
      try {
        const {
          title_en,
          description_en,
          title_lo,
          description_lo,
        } = req.body;
        const image = req.file ? req.file.filename : null;

        const plant = await CrushingPlant.create({
          title_en,
          description_en,
          title_lo,
          description_lo,
          image: image ? path.join(folder, image) : null,
        });

        res.status(201).json(plant);
      } catch (err) {
        console.error("Error creating crushing plant:", err);
        res.status(500).json({ error: err.message });
      }
    },
  ];
};

// Update crushing plant
exports.updateCrushingPlant = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single("image"),
    async (req, res) => {
      try {
        const { id } = req.params;
        const {
          title_en,
          description_en,
          title_lo,
          description_lo,
        } = req.body;
        const image = req.file ? req.file.filename : null;

        const existingPlant = await CrushingPlant.findOne({ where: { id } });

        if (!existingPlant) {
          return res.status(404).json({ error: "Crushing plant not found" });
        }

        existingPlant.title_en = title_en || existingPlant.title_en;
        existingPlant.description_en = description_en || existingPlant.description_en;
        existingPlant.title_lo = title_lo || existingPlant.title_lo;
        existingPlant.description_lo = description_lo || existingPlant.description_lo;
        if (image) {
          existingPlant.image = path.join(folder, image);
        }

        await existingPlant.save();
        res.status(200).json(existingPlant);
      } catch (err) {
        console.error("Error updating crushing plant:", err);
        res.status(500).json({ error: err.message });
      }
    },
  ];
};

// Delete crushing plant
exports.deleteCrushingPlant = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CrushingPlant.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(204).send("Crushing plant deleted");
    } else {
      throw new Error("Crushing plant not found");
    }
  } catch (err) {
    console.error("Error deleting crushing plant:", err);
    res.status(500).json({ error: err.message });
  }
};
