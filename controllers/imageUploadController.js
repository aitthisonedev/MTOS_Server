const multer = require("multer");
const path = require("path");
const ImageUploadModel = require("../models/ImageUpload");

// Configure multer for file uploads
const apiUrl = process.env.VITE_API_URL;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "ImageUpload/"); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Retain original filename
  },
});

const imageUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|ico|png|gif|svg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

exports.getImageUpload = async (req, res) => {
  try {
    const imageUpload = await ImageUploadModel.findOne({
      where: { type: req.params.type },
    });
    if (!imageUpload) {
      return res.status(404).json({ message: "Image update not found" });
    }
    const imageUrl = `${apiUrl}/ImageUpload/${path.basename(
      imageUpload.value
    )}`;
    res.json({ imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrUpdateImageUpload = async (req, res) => {
  const { type, value, seqID } = req.body;
  try {
    if (!type || !seqID) {
      return res.status(400).json({ message: "Type and seqID are required." });
    }

    let imageUpload = await ImageUploadModel.findOne({ where: { type } });
    if (imageUpload) {
      imageUpload.value = value;
      imageUpload.seqID = seqID;
      await imageUpload.save();
    } else {
      imageUpload = await ImageUploadModel.create({ type, value, seqID });
    }
    res
      .status(200)
      .json({ message: "Image update saved successfully", imageUpload });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteImageUpload = async (req, res) => {
  try {
    const imageUpload = await ImageUploadModel.findOne({
      where: { type: req.params.type },
    });
    if (!imageUpload) {
      return res.status(404).json({ message: "Image update not found" });
    }
    await imageUpload.destroy();
    res.status(200).json({ message: "Image update deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const type = req.body.type;
    const value = req.file.path;
    const seqID = req.body.seqID;

    if (!type || !seqID) {
      return res.status(400).json({ message: "Type and seqID are required." });
    }

    let imageUpload = await ImageUploadModel.findOne({ where: { type } });
    if (imageUpload) {
      imageUpload.value = value;
      imageUpload.seqID = seqID;
      await imageUpload.save();
    } else {
      imageUpload = await ImageUploadModel.create({ type, value, seqID });
    }

    const imageUrl = `${apiUrl}/ImageUpload/${req.file.filename}`;

    res.status(200).json({
      message: "Image updated successfully",
      imageUpload,
      imageUrl,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.imageUpload = imageUpload;
