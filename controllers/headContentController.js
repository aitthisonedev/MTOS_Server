const HeadContent = require("../models/headContentModel");
const createImageUpload = require("../configs/multerConfig");

exports.getAllHeadContents = async (req, res) => {
  try {
    const headContents = await HeadContent.findAll();
    const baseResponse = headContents.map(content => ({
      ...content.toJSON(),
      image: content.image ? `/ImageUpload/${content.image}` : null,
    }));
    res.json(baseResponse);
  } catch (err) {
    console.error('Error fetching head contents:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createHeadContent = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single('image'),
    async (req, res) => {
      try {
        const {
          titleOne_en,
          titleOne_lo,
          descriptionOne_en,
          descriptionOne_lo,
        } = req.body;

        const image = req.file ? `${folder}/${req.file.filename}` : null;

        const headContent = await HeadContent.create({
          titleOne_en,
          titleOne_lo,
          descriptionOne_en,
          descriptionOne_lo,
          image,
        });

        res.status(201).json(headContent);
      } catch (err) {
        console.error("Error creating head content:", err);
        res.status(500).json({ error: err.message });
      }
    },
  ];
};

exports.updateHeadContent = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single('image'),
    async (req, res) => {
      try {
        const { id } = req.params;
        const {
          titleOne_en,
          titleOne_lo,
          descriptionOne_en,
          descriptionOne_lo,
        } = req.body;

        const existingContent = await HeadContent.findOne({ where: { id } });

        if (!existingContent) {
          return res.status(404).json({ error: "Content not found" });
        }

        existingContent.titleOne_en = titleOne_en || existingContent.titleOne_en;
        existingContent.titleOne_lo = titleOne_lo || existingContent.titleOne_lo;
        existingContent.descriptionOne_en = descriptionOne_en || existingContent.descriptionOne_en;
        existingContent.descriptionOne_lo = descriptionOne_lo || existingContent.descriptionOne_lo;

        if (req.file) {
          existingContent.image = `${folder}/${req.file.filename}`;
        }

        await existingContent.save();
        res.status(200).json(existingContent);
      } catch (err) {
        console.error("Error updating head content:", err);
        res.status(500).json({ error: err.message });
      }
    },
  ];
};

exports.deleteHeadContent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await HeadContent.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(204).send("Head content deleted");
    } else {
      throw new Error("Head content not found");
    }
  } catch (err) {
    console.error("Error deleting head content:", err);
    res.status(500).json({ error: err.message });
  }
}; 