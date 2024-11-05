const Logopartner = require('../models/LogopartnersModel');
const fs = require('fs');
const path = require('path');
const createImageUpload = require('../configs/multerConfig');

// Get all logo partners
exports.getAllLogopartners = async (req, res) => {
  try {
    const logopartners = await Logopartner.findAll();
    const baseResponse = logopartners.map(item => {
      const imageUrl = item.image ? `${req.protocol}://${req.get('host')}/ImageUpload/${item.image}` : null;
      return {
        ...item.toJSON(),
        image: imageUrl
      };
    });
    res.json(baseResponse);
  } catch (err) {
    console.error('Error fetching logopartners:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get logo partner by ID
exports.getLogopartnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const logopartner = await Logopartner.findOne({ where: { id } });

    if (!logopartner) {
      return res.status(404).json({ error: 'Logopartner not found' });
    }

    const imageUrl = logopartner.image ? `${req.protocol}://${req.get('host')}/ImageUpload/${logopartner.image}` : null;

    const response = {
      ...logopartner.toJSON(),
      image: imageUrl
    };

    res.json(response);
  } catch (err) {
    console.error('Error fetching logopartner by ID:', err);
    res.status(500).json({ error: err.message });
  }
};


// Create or update logo partner
exports.createOrUpdateLogopartner = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single('image'),
    async (req, res) => {
      try {
        const { id } = req.body;
        const image = req.file ? path.join(folder, req.file.filename) : null;

        let logopartner;
        if (id) {
          logopartner = await Logopartner.findByPk(id);
          if (logopartner) {
            if (image) {
              logopartner.image = image;
            }
            await logopartner.save();
          } else {
            logopartner = await Logopartner.create({ image });
          }
        } else {
          logopartner = await Logopartner.create({ image });
        }
        res.status(200).json(logopartner);
      } catch (err) {
        console.error('Error creating or updating logopartner:', err);
        res.status(500).json({ error: err.message });
      }
    }
  ];
};

// Delete logo partner
exports.deleteLogopartner = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Logopartner.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).send("Logopartner deleted");
    } else {
      throw new Error("Logopartner not found");
    }
  } catch (err) {
    console.error('Error deleting logopartner:', err);
    res.status(500).json({ error: err.message });
  }
};
