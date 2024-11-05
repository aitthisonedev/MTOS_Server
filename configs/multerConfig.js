const multer = require('multer');
const path = require('path');
const fs = require('fs');


const createImageUpload = (folder) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(__dirname, '..', 'ImageUpload', folder);
      // Ensure the directory exists
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath); // Destination folder
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Retain original filename
    }
  });

  return multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|ico|png|webp|avif|gif|svg/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'));
      }
    }
  });
};

module.exports = createImageUpload;