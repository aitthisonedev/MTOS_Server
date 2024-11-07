const ContentTwo = require("../models/contentTwoModel");
const createImageUpload = require("../configs/multerConfig");
const fs = require('fs').promises;
const path = require('path');

// Get all content twos
exports.getAllContentTwos = async (req, res) => {
  try {
    const contentTwos = await ContentTwo.findAll({
      order: [['createdAt', 'DESC']]
    });
    const baseResponse = contentTwos.map(content => ({
      ...content.toJSON(),
      image: content.image ? `/ImageUpload/${content.image}` : null,
    }));
    res.json(baseResponse);
  } catch (err) {
    console.error('Error fetching content twos:', err);
    res.status(500).json({ error: 'Failed to fetch content twos' });
  }
};

// Create new content two
exports.createContentTwo = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single('image'),
    async (req, res) => {
      try {
        const {
          title_en,
          title_lo,
          description_en,
          description_lo,
        } = req.body;

        // Validate required fields
        if (!title_en || !title_lo || !description_en || !description_lo) {
          return res.status(400).json({ error: "All fields are required" });
        }

        const image = req.file ? req.file.filename : null;

        const contentTwo = await ContentTwo.create({
          title_en,
          title_lo,
          description_en,
          description_lo,
          image,
        });

        res.status(201).json({
          ...contentTwo.toJSON(),
          image: image ? `/ImageUpload/${image}` : null,
        });
      } catch (err) {
        console.error("Error creating content two:", err);
        res.status(500).json({ error: "Failed to create content two" });
      }
    },
  ];
};

// Update content two
exports.updateContentTwo = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single('image'),
    async (req, res) => {
      try {
        const { id } = req.params;
        const {
          title_en,
          title_lo,
          description_en,
          description_lo,
        } = req.body;

        const existingContent = await ContentTwo.findByPk(id);

        if (!existingContent) {
          return res.status(404).json({ error: "Content not found" });
        }

        // Prepare updates
        const updates = {
          title_en: title_en || existingContent.title_en,
          title_lo: title_lo || existingContent.title_lo,
          description_en: description_en || existingContent.description_en,
          description_lo: description_lo || existingContent.description_lo,
        };

        // Handle image update
        if (req.file) {
          // Delete old image if exists
          if (existingContent.image) {
            const oldImagePath = path.join(__dirname, '..', 'ImageUpload', existingContent.image);
            try {
              await fs.unlink(oldImagePath);
            } catch (error) {
              console.error('Error deleting old image:', error);
            }
          }
          updates.image = req.file.filename;
        }

        await existingContent.update(updates);
        
        res.status(200).json({
          ...existingContent.toJSON(),
          image: existingContent.image ? `/ImageUpload/${existingContent.image}` : null,
        });
      } catch (err) {
        console.error("Error updating content two:", err);
        res.status(500).json({ error: "Failed to update content two" });
      }
    },
  ];
};

// Delete content two
exports.deleteContentTwo = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await ContentTwo.findByPk(id);

    if (!content) {
      return res.status(404).json({ error: "Content two not found" });
    }

    // Delete associated image if exists
    if (content.image) {
      const imagePath = path.join(__dirname, '..', 'ImageUpload', content.image);
      try {
        await fs.unlink(imagePath);
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    await content.destroy();
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting content two:", err);
    res.status(500).json({ error: "Failed to delete content two" });
  }
}; 