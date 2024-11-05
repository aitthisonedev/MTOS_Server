const Gallery = require('../models/GalleryModel');
const fs = require('fs');
const path = require('path');

// Get all gallery images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Gallery.findAll();
    res.json(images);
  } catch (err) {
    console.error('Error fetching gallery images:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get image by ID
exports.getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Gallery.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.json(image);
  } catch (err) {
    console.error('Error fetching image:', err);
    res.status(500).json({ error: err.message });
  }
};

// Add a new image
exports.createImage = async (req, res) => {
  try {
    const src = `/ImageUpload/${req.file.filename}`;
    const image = await Gallery.create({ src });
    res.status(201).json(image);
  } catch (err) {
    console.error('Error creating image:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update an existing image
exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Gallery.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Update image file if a new one is uploaded
    if (req.file) {
      const oldImagePath = path.join(__dirname, '..', 'ImageUpload', path.basename(image.src));
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Remove the old image file
      }
      image.src = `/ImageUpload/${req.file.filename}`;
    }

    await image.save();
    res.json(image);
  } catch (err) {
    console.error('Error updating image:', err);
    res.status(500).json({ error: err.message });
  }
};

// Delete an image
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Gallery.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const imagePath = path.join(__dirname, '..', 'ImageUpload', path.basename(image.src));
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Delete the image file from the server
    }

    await image.destroy();
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ error: err.message });
  }
};
