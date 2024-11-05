const Slider = require('../models/SlideModel');
const path = require('path');
const createImageUpload = require('../configs/multerConfig');

// Get all sliders
exports.getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider.findAll();
    const baseResponse = sliders.map(item => ({
      ...item.toJSON(),
      imageUrl: item.image ? `${req.protocol}://${req.get('host')}/ImageUpload/${item.image}` : null,
    }));
    res.json(baseResponse);
  } catch (err) {
    console.error('Error fetching sliders:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get slider by ID
exports.getSliderById = async (req, res) => {
  try {
    const { id } = req.params;
    const slider = await Slider.findOne({ where: { id } });

    if (!slider) {
      return res.status(404).json({ error: 'Slider not found' });
    }

    const imageUrl = slider.image ? `${req.protocol}://${req.get('host')}/ImageUpload/${slider.image}` : null;
    res.json({ ...slider.toJSON(), image: imageUrl });
  } catch (err) {
    console.error('Error fetching slider by ID:', err);
    res.status(500).json({ error: err.message });
  }
};

// Create or update slider
exports.createOrUpdateSlider = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single('image'),
    async (req, res) => {
      try {
        const { id, title } = req.body;
        const image = req.file ? path.join(folder, req.file.filename) : null;

        let slider;
        if (id) {
          slider = await Slider.findByPk(id);
          if (slider) {
            if (image) {
              slider.image = image;
            }
            slider.title = title;
            await slider.save();
          } else {
            slider = await Slider.create({ title, image });
          }
        } else {
          slider = await Slider.create({ title, image });
        }
        res.status(200).json(slider);
      } catch (err) {
        console.error('Error creating or updating slider:', err);
        res.status(500).json({ error: err.message });
      }
    },
  ];
};

// Delete slider
exports.deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Slider.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send('Slider deleted');
    } else {
      throw new Error('Slider not found');
    }
  } catch (err) {
    console.error('Error deleting slider:', err);
    res.status(500).json({ error: err.message });
  }
};
