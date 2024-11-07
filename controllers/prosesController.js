const Proses = require("../models/prosesModel");

exports.getAllProses = async (req, res) => {
  try {
    const proses = await Proses.findAll();
    res.json(proses);
  } catch (err) {
    console.error('Error fetching proses:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createProses = async (req, res) => {
  try {
    const {
      titleOne_en,
      titleOne_lo,
      descriptionOne_en,
      descriptionOne_lo,
    } = req.body;

    const proses = await Proses.create({
      titleOne_en,
      titleOne_lo,
      descriptionOne_en,
      descriptionOne_lo,
    });

    res.status(201).json(proses);
  } catch (err) {
    console.error("Error creating proses:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateProses = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      titleOne_en,
      titleOne_lo,
      descriptionOne_en,
      descriptionOne_lo,
    } = req.body;

    const existingProses = await Proses.findOne({ where: { id } });

    if (!existingProses) {
      return res.status(404).json({ error: "Proses not found" });
    }

    existingProses.titleOne_en = titleOne_en || existingProses.titleOne_en;
    existingProses.titleOne_lo = titleOne_lo || existingProses.titleOne_lo;
    existingProses.descriptionOne_en = descriptionOne_en || existingProses.descriptionOne_en;
    existingProses.descriptionOne_lo = descriptionOne_lo || existingProses.descriptionOne_lo;

    await existingProses.save();
    res.status(200).json(existingProses);
  } catch (err) {
    console.error("Error updating proses:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProses = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Proses.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(204).send("Proses deleted");
    } else {
      throw new Error("Proses not found");
    }
  } catch (err) {
    console.error("Error deleting proses:", err);
    res.status(500).json({ error: err.message });
  }
}; 