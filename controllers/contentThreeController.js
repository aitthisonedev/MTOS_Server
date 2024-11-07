const ContentThree = require("../models/contentThreeModel");
const createImageUpload = require("../configs/multerConfig");
const fs = require('fs').promises;
const path = require('path');

exports.getAllContentThrees = async (req, res) => {
  try {
    const contentThrees = await ContentThree.findAll({
      order: [['createdAt', 'DESC']]
    });
    const baseResponse = contentThrees.map(content => ({
      ...content.toJSON(),
      image: content.image ? `/ImageUpload/${content.image}` : null,
    }));
    res.json(baseResponse);
  } catch (err) {
    console.error('Error fetching content threes:', err);
    res.status(500).json({ error: 'Failed to fetch content threes' });
  }
};

exports.createContentThree = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single('image'),
    async (req, res) => {
      try {
        const { title_en, title_lo, description_en, description_lo } = req.body;

        if (!title_en || !title_lo || !description_en || !description_lo) {
          return res.status(400).json({ error: "All fields are required" });
        }

        const image = req.file ? req.file.filename : null;

        const contentThree = await ContentThree.create({
          title_en,
          title_lo,
          description_en,
          description_lo,
          image,
        });

        res.status(201).json({
          ...contentThree.toJSON(),
          image: image ? `/ImageUpload/${image}` : null,
        });
      } catch (err) {
        console.error("Error creating content three:", err);
        res.status(500).json({ error: "Failed to create content three" });
      }
    },
  ];
};

exports.updateContentThree = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single('image'),
    async (req, res) => {
      try {
        const { id } = req.params;
        const { title_en, title_lo, description_en, description_lo } = req.body;

        const existingContent = await ContentThree.findByPk(id);

        if (!existingContent) {
          return res.status(404).json({ error: "Content not found" });
        }

        const updates = {
          title_en: title_en || existingContent.title_en,
          title_lo: title_lo || existingContent.title_lo,
          description_en: description_en || existingContent.description_en,
          description_lo: description_lo || existingContent.description_lo,
        };

        if (req.file) {
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
        console.error("Error updating content three:", err);
        res.status(500).json({ error: "Failed to update content three" });
      }
    },
  ];
};

exports.deleteContentThree = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await ContentThree.findByPk(id);

    if (!content) {
      return res.status(404).json({ error: "Content three not found" });
    }

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
    console.error("Error deleting content three:", err);
    res.status(500).json({ error: "Failed to delete content three" });
  }
}; 