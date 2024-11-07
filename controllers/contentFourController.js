const ContentFour = require("../models/contentFourModel");
const createImageUpload = require("../configs/multerConfig");
const fs = require('fs').promises;
const path = require('path');

exports.getAllContentFours = async (req, res) => {
  try {
    const contentFours = await ContentFour.findAll({
      order: [['createdAt', 'DESC']]
    });
    const baseResponse = contentFours.map(content => ({
      ...content.toJSON(),
      image: content.image ? `/ImageUpload/${content.image}` : null,
    }));
    res.json(baseResponse);
  } catch (err) {
    console.error('Error fetching content fours:', err);
    res.status(500).json({ error: 'Failed to fetch content fours' });
  }
};

exports.createContentFour = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single('image'),
    async (req, res) => {
      try {
        const { title_en, title_lo, description_en, description_lo, video_link } = req.body;

        if (!title_en || !title_lo || !description_en || !description_lo) {
          return res.status(400).json({ error: "All fields are required" });
        }

        const image = req.file ? req.file.filename : null;

        const contentFour = await ContentFour.create({
          title_en,
          title_lo,
          description_en,
          description_lo,
          video_link,
          image,
        });

        res.status(201).json({
          ...contentFour.toJSON(),
          image: image ? `/ImageUpload/${image}` : null,
        });
      } catch (err) {
        console.error("Error creating content four:", err);
        res.status(500).json({ error: "Failed to create content four" });
      }
    },
  ];
};

exports.updateContentFour = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single('image'),
    async (req, res) => {
      try {
        const { id } = req.params;
        const { title_en, title_lo, description_en, description_lo, video_link } = req.body;

        const existingContent = await ContentFour.findByPk(id);

        if (!existingContent) {
          return res.status(404).json({ error: "Content not found" });
        }

        const updates = {
          title_en: title_en || existingContent.title_en,
          title_lo: title_lo || existingContent.title_lo,
          description_en: description_en || existingContent.description_en,
          description_lo: description_lo || existingContent.description_lo,
          video_link: video_link || existingContent.video_link,
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
        console.error("Error updating content four:", err);
        res.status(500).json({ error: "Failed to update content four" });
      }
    },
  ];
};

exports.deleteContentFour = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await ContentFour.findByPk(id);

    if (!content) {
      return res.status(404).json({ error: "Content four not found" });
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
    console.error("Error deleting content four:", err);
    res.status(500).json({ error: "Failed to delete content four" });
  }
}; 