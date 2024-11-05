const Testimonial = require('../models/testimonialModel');
const path = require('path');
const createImageUpload = require('../configs/multerConfig');

// Get all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    const baseResponse = testimonials.map(testimonial => ({
      ...testimonial.toJSON(),
      image: testimonial.image ? `/ImageUpload/${testimonial.image}` : null,
    }));
    res.json(baseResponse);
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    res.status(500).json({ error: err.message });
  }
};

// Create a new testimonial
exports.createTestimonial = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single('image'),
    async (req, res) => {
      try {
        const { name_en, name_lo, country_en, country_lo, clients_en, clients_lo } = req.body;
        const image = req.file ? req.file.filename : null;

        const testimonial = await Testimonial.create({
          name_en,
          name_lo,
          country_en,
          country_lo,
          clients_en,
          clients_lo,
          image: image ? path.join(folder, image) : null,
        });

        res.status(201).json(testimonial);
      } catch (err) {
        console.error('Error creating testimonial:', err);
        res.status(500).json({ error: err.message });
      }
    },
  ];
};

// Update a testimonial
exports.updateTestimonial = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single('image'),
    async (req, res) => {
      try {
        const { id } = req.params;
        const { name_en, name_lo, country_en, country_lo, clients_en, clients_lo } = req.body;
        const image = req.file ? req.file.filename : null;

        const existingTestimonial = await Testimonial.findOne({ where: { id } });

        if (!existingTestimonial) {
          return res.status(404).json({ error: 'Testimonial not found' });
        }

        existingTestimonial.name_en = name_en || existingTestimonial.name_en;
        existingTestimonial.name_lo = name_lo || existingTestimonial.name_lo;
        existingTestimonial.country_en = country_en || existingTestimonial.country_en;
        existingTestimonial.country_lo = country_lo || existingTestimonial.country_lo;
        existingTestimonial.clients_en = clients_en || existingTestimonial.clients_en;
        existingTestimonial.clients_lo = clients_lo || existingTestimonial.clients_lo;
        if (image) {
          existingTestimonial.image = path.join(folder, image);
        }

        await existingTestimonial.save();
        res.status(200).json(existingTestimonial);
      } catch (err) {
        console.error('Error updating testimonial:', err);
        res.status(500).json({ error: err.message });
      }
    },
  ];
};

// Delete a testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Testimonial.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send('Testimonial deleted');
    } else {
      throw new Error('Testimonial not found');
    }
  } catch (err) {
    console.error('Error deleting testimonial:', err);
    res.status(500).json({ error: err.message });
  }
};
