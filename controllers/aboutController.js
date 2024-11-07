const About = require("../models/aboutModel");
const createImageUpload = require("../configs/multerConfig");

exports.getAllAbouts = async (req, res) => {
  try {
    const abouts = await About.findAll();
    const baseResponse = abouts.map(about => ({
      ...about.toJSON(),
      imageOne: about.imageOne ? `/ImageUpload/${about.imageOne}` : null,
      imageTwo: about.imageTwo ? `/ImageUpload/${about.imageTwo}` : null,
    }));
    res.json(baseResponse);
  } catch (err) {
    console.error('Error fetching abouts:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAboutById = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findOne({ where: { id } });

    if (!about) {
      return res.status(404).json({ error: "About not found" });
    }

    const response = {
      ...about.toJSON(),
      imageOne: about.imageOne ? `/ImageUpload/${about.imageOne}` : null,
      imageTwo: about.imageTwo ? `/ImageUpload/${about.imageTwo}` : null,
    };

    res.json(response);
  } catch (err) {
    console.error("Error fetching about by ID:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.createAbout = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.fields([
      { name: 'imageOne', maxCount: 1 },
      { name: 'imageTwo', maxCount: 1 }
    ]),
    async (req, res) => {
      try {
        const {
          titleOne_en,
          titleOne_lo,
          descriptionOne_en,
          descriptionOne_lo,
          descriptionTwo_en,
          descriptionTwo_lo,
        } = req.body;

        const imageOne = req.files.imageOne ? req.files.imageOne[0].filename : null;
        const imageTwo = req.files.imageTwo ? req.files.imageTwo[0].filename : null;

        const about = await About.create({
          titleOne_en,
          titleOne_lo,
          descriptionOne_en,
          descriptionOne_lo,
          descriptionTwo_en,
          descriptionTwo_lo,
          imageOne: imageOne ? `${folder}/${imageOne}` : null,
          imageTwo: imageTwo ? `${folder}/${imageTwo}` : null,
        });

        res.status(201).json(about);
      } catch (err) {
        console.error("Error creating about:", err);
        res.status(500).json({ error: err.message });
      }
    },
  ];
};

exports.updateAbout = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.fields([
      { name: 'imageOne', maxCount: 1 },
      { name: 'imageTwo', maxCount: 1 }
    ]),
    async (req, res) => {
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

        const existingAbout = await About.findOne({ where: { id } });

        if (!existingAbout) {
          return res.status(404).json({ error: "About not found" });
        }

        existingAbout.titleOne_en = titleOne_en || existingAbout.titleOne_en;
        existingAbout.titleOne_lo = titleOne_lo || existingAbout.titleOne_lo;
        existingAbout.descriptionOne_en = descriptionOne_en || existingAbout.descriptionOne_en;
        existingAbout.descriptionOne_lo = descriptionOne_lo || existingAbout.descriptionOne_lo;
        existingAbout.descriptionTwo_en = descriptionTwo_en || existingAbout.descriptionTwo_en;
        existingAbout.descriptionTwo_lo = descriptionTwo_lo || existingAbout.descriptionTwo_lo;

        if (req.files.imageOne) {
          existingAbout.imageOne = `${folder}/${req.files.imageOne[0].filename}`;
        }
        if (req.files.imageTwo) {
          existingAbout.imageTwo = `${folder}/${req.files.imageTwo[0].filename}`;
        }

        await existingAbout.save();
        res.status(200).json(existingAbout);
      } catch (err) {
        console.error("Error updating about:", err);
        res.status(500).json({ error: err.message });
      }
    },
  ];
};

exports.deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await About.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(204).send("About deleted");
    } else {
      throw new Error("About not found");
    }
  } catch (err) {
    console.error("Error deleting about:", err);
    res.status(500).json({ error: err.message });
  }
};
