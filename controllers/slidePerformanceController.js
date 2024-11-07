const SlidePerformance = require("../models/slidePerformanceModel");
const createImageUpload = require("../configs/multerConfig");
const fs = require('fs').promises;
const path = require('path');

exports.getAllSlidePerformances = async (req, res) => {
  try {
    const slidePerformances = await SlidePerformance.findAll({
      order: [['createdAt', 'DESC']]
    });
    const baseResponse = slidePerformances.map(slide => ({
      ...slide.toJSON(),
      image: slide.image ? `/ImageUpload/${slide.image}` : null,
    }));
    res.json(baseResponse);
  } catch (err) {
    console.error('Error fetching slide performances:', err);
    res.status(500).json({ error: 'Failed to fetch slide performances' });
  }
};

exports.createSlidePerformance = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single('image'),
    async (req, res) => {
      try {
        const { name } = req.body;

        if (!name) {
          return res.status(400).json({ error: "Name is required" });
        }

        const image = req.file ? req.file.filename : null;

        const slidePerformance = await SlidePerformance.create({
          name,
          image,
        });

        res.status(201).json({
          ...slidePerformance.toJSON(),
          image: image ? `/ImageUpload/${image}` : null,
        });
      } catch (err) {
        console.error("Error creating slide performance:", err);
        res.status(500).json({ error: "Failed to create slide performance" });
      }
    },
  ];
};

exports.updateSlidePerformance = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single('image'),
    async (req, res) => {
      try {
        const { id } = req.params;
        const { name } = req.body;

        const existingSlide = await SlidePerformance.findByPk(id);

        if (!existingSlide) {
          return res.status(404).json({ error: "Slide performance not found" });
        }

        const updates = {
          name: name || existingSlide.name,
        };

        if (req.file) {
          if (existingSlide.image) {
            const oldImagePath = path.join(__dirname, '..', 'ImageUpload', existingSlide.image);
            try {
              await fs.unlink(oldImagePath);
            } catch (error) {
              console.error('Error deleting old image:', error);
            }
          }
          updates.image = req.file.filename;
        }

        await existingSlide.update(updates);
        
        res.status(200).json({
          ...existingSlide.toJSON(),
          image: existingSlide.image ? `/ImageUpload/${existingSlide.image}` : null,
        });
      } catch (err) {
        console.error("Error updating slide performance:", err);
        res.status(500).json({ error: "Failed to update slide performance" });
      }
    },
  ];
};

exports.deleteSlidePerformance = async (req, res) => {
  try {
    const { id } = req.params;
    const slide = await SlidePerformance.findByPk(id);

    if (!slide) {
      return res.status(404).json({ error: "Slide performance not found" });
    }

    if (slide.image) {
      const imagePath = path.join(__dirname, '..', 'ImageUpload', slide.image);
      try {
        await fs.unlink(imagePath);
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    await slide.destroy();
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting slide performance:", err);
    res.status(500).json({ error: "Failed to delete slide performance" });
  }
}; 