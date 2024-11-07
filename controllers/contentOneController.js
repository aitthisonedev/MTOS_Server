const ContentOne = require("../models/contentOneModel");
const createImageUpload = require("../configs/multerConfig");

exports.getAllContentOnes = async (req, res) => {
  try {
    const contentOnes = await ContentOne.findAll();
    const baseResponse = contentOnes.map(content => ({
      ...content.toJSON(),
      image: content.image ? `/ImageUpload/${content.image}` : null,
    }));
    res.json(baseResponse);
  } catch (err) {
    console.error('Error fetching content ones:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createContentOne = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single('image'),
    async (req, res) => {
      try {
        const {
          title_en,
          title_lo,
          content_en,
          content_lo,
          description_en,
          description_lo,
        } = req.body;

        const image = req.file ? `${folder}/${req.file.filename}` : null;

        const contentOne = await ContentOne.create({
          title_en,
          title_lo,
          content_en,
          content_lo,
          description_en,
          description_lo,
          image,
        });

        res.status(201).json(contentOne);
      } catch (err) {
        console.error("Error creating content one:", err);
        res.status(500).json({ error: err.message });
      }
    },
  ];
};

exports.updateContentOne = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single('image'),
    async (req, res) => {
      try {
        const { id } = req.params;
        const {
          title_en,
          title_lo,
          content_en,
          content_lo,
          description_en,
          description_lo,
        } = req.body;

        const existingContent = await ContentOne.findOne({ where: { id } });

        if (!existingContent) {
          return res.status(404).json({ error: "Content not found" });
        }

        const updates = {
          title_en: title_en || existingContent.title_en,
          title_lo: title_lo || existingContent.title_lo,
          content_en: content_en || existingContent.content_en,
          content_lo: content_lo || existingContent.content_lo,
          description_en: description_en || existingContent.description_en,
          description_lo: description_lo || existingContent.description_lo,
        };

        if (req.file) {
          updates.image = `${folder}/${req.file.filename}`;
        }

        await existingContent.update(updates);
        res.status(200).json(existingContent);
      } catch (err) {
        console.error("Error updating content one:", err);
        res.status(500).json({ error: err.message });
      }
    },
  ];
};

exports.deleteContentOne = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ContentOne.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(204).send("Content one deleted");
    } else {
      throw new Error("Content one not found");
    }
  } catch (err) {
    console.error("Error deleting content one:", err);
    res.status(500).json({ error: err.message });
  }
}; 