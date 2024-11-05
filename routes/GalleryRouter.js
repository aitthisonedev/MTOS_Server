const express = require('express');
const router = express.Router();
const GalleryController = require('../controllers/GalleryController');
const multer = require('multer');

// Setup multer for image ImageUpload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'ImageUpload/'); // Adjust the path as needed
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Routes
router.get('/', GalleryController.getAllImages);
router.get('/:id', GalleryController.getImageById);
router.post('/', upload.single('image'), GalleryController.createImage);
router.put('/:id', upload.single('image'), GalleryController.updateImage);
router.delete('/:id', GalleryController.deleteImage);

module.exports = router;

