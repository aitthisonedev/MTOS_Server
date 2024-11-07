const Performance = require("../models/performanceModel");
const createImageUpload = require("../configs/multerConfig");

exports.getAllPerformances = async (req, res) => {
  try {
    const performances = await Performance.findAll();
    const baseResponse = performances.map(performance => ({
      ...performance.toJSON(),
      image: performance.image ? `/ImageUpload/${performance.image}` : null,
    }));
    res.json(baseResponse);
  } catch (err) {
    console.error('Error fetching performances:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createPerformance = (folder) => {
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

        const image = req.file ? `${folder}/${req.file.filename}` : null;

        const performance = await Performance.create({
          title_en,
          title_lo,
          description_en,
          description_lo,
          image,
        });

        res.status(201).json(performance);
      } catch (err) {
        console.error("Error creating performance:", err);
        res.status(500).json({ error: err.message });
      }
    },
  ];
};

exports.updatePerformance = (folder) => {
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

        const existingPerformance = await Performance.findOne({ where: { id } });

        if (!existingPerformance) {
          return res.status(404).json({ error: "Performance not found" });
        }

        existingPerformance.title_en = title_en || existingPerformance.title_en;
        existingPerformance.title_lo = title_lo || existingPerformance.title_lo;
        existingPerformance.description_en = description_en || existingPerformance.description_en;
        existingPerformance.description_lo = description_lo || existingPerformance.description_lo;

        if (req.file) {
          existingPerformance.image = `${folder}/${req.file.filename}`;
        }

        await existingPerformance.save();
        res.status(200).json(existingPerformance);
      } catch (err) {
        console.error("Error updating performance:", err);
        res.status(500).json({ error: err.message });
      }
    },
  ];
};

exports.deletePerformance = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Performance.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(204).send("Performance deleted");
    } else {
      throw new Error("Performance not found");
    }
  } catch (err) {
    console.error("Error deleting performance:", err);
    res.status(500).json({ error: err.message });
  }
}; 