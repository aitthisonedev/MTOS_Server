const Content = require("../models/contentModel");

exports.getAllContents = async (req, res) => {
  try {
    const contents = await Content.findAll();
    res.json(contents);
  } catch (err) {
    console.error('Error fetching contents:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createContent = async (req, res) => {
  try {
    const {
      titleOne_en,
      titleOne_lo,
      descriptionOne_en,
      descriptionOne_lo,
      descriptionTwo_en,
      descriptionTwo_lo,
    } = req.body;

    const content = await Content.create({
      titleOne_en,
      titleOne_lo,
      descriptionOne_en,
      descriptionOne_lo,
      descriptionTwo_en,
      descriptionTwo_lo,
    });

    res.status(201).json(content);
  } catch (err) {
    console.error("Error creating content:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      titleOne_en,
      titleOne_lo,
      descriptionOne_en,
      descriptionOne_lo,
      descriptionTwo_en,
      descriptionTwo_lo,
    } = req.body;

    const existingContent = await Content.findOne({ where: { id } });

    if (!existingContent) {
      return res.status(404).json({ error: "Content not found" });
    }

    existingContent.titleOne_en = titleOne_en || existingContent.titleOne_en;
    existingContent.titleOne_lo = titleOne_lo || existingContent.titleOne_lo;
    existingContent.descriptionOne_en = descriptionOne_en || existingContent.descriptionOne_en;
    existingContent.descriptionOne_lo = descriptionOne_lo || existingContent.descriptionOne_lo;
    existingContent.descriptionTwo_en = descriptionTwo_en || existingContent.descriptionTwo_en;
    existingContent.descriptionTwo_lo = descriptionTwo_lo || existingContent.descriptionTwo_lo;

    await existingContent.save();
    res.status(200).json(existingContent);
  } catch (err) {
    console.error("Error updating content:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Content.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(204).send("Content deleted");
    } else {
      throw new Error("Content not found");
    }
  } catch (err) {
    console.error("Error deleting content:", err);
    res.status(500).json({ error: err.message });
  }
}; 