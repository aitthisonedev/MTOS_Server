const News = require('../models/newsModel');
const fs = require('fs');
const path = require('path');
const createImageUpload = require('../configs/multerConfig');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// Get all news items
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.findAll();

    const baseResponse = news.map(item => {
      const headImgUrl = item.headImg ? `${req.protocol}://${req.get('host')}/ImageUpload/${item.headImg}` : null;
      const subImgsUrls = item.subImgs ? item.subImgs.map(img => `${req.protocol}://${req.get('host')}/ImageUpload/${img}`) : [];

      return {
        ...item.toJSON(),
        headImg: headImgUrl,
        subImgs: subImgsUrls,
      };
    });

    res.json(baseResponse);
  } catch (err) {
    console.error('Error fetching news:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get news by ID
exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findOne({ where: { news_id: id } });

    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }

    const headImgPath = news.headImg ? path.join(__dirname, '../ImageUpload', news.headImg) : null;
    const subImgsPaths = news.subImgs ? news.subImgs.map(img => path.join(__dirname, '../ImageUpload', img)) : [];

    const response = {
      ...news.toJSON(),
      headImg: headImgPath && fs.existsSync(headImgPath) ? `data:image/png;base64,${fs.readFileSync(headImgPath).toString('base64')}` : null,
      subImgs: subImgsPaths.filter(imgPath => fs.existsSync(imgPath)).map(imgPath => `data:image/png;base64,${fs.readFileSync(imgPath).toString('base64')}`),
      title_en: news.title_en,
      description_en: news.description_en,
      title_lo: news.title_lo,
      description_lo: news.description_lo,
    };

    res.json(response);
  } catch (err) {
    console.error('Error fetching news by ID:', err);
    res.status(500).json({ error: err.message });
  }
};

// Create news
exports.createNews = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.fields([{ name: 'headImg', maxCount: 1 }, { name: 'subImgs', maxCount: 10 }]),
    async (req, res) => {
      try {
        const { title_en, description_en, title_lo, description_lo, Categories_en, Categories_lo } = req.body;
        const headImg = req.files['headImg'] ? req.files['headImg'][0].filename : null;
        const subImgs = req.files['subImgs'] ? req.files['subImgs'].map(file => file.filename) : [];

        let userId;
        try {
          const token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          userId = decoded.id;
        } catch (error) {
          return res.status(401).json({ error: 'Invalid or missing token' });
        }
        if (!userId) {
          return res.status(400).json({ error: "User ID is missing in token" });
        }

        const news = await News.create({
          headImg: headImg ? path.join(folder, headImg) : null,
          subImgs: subImgs.map(img => path.join(folder, img)),
          title_en,
          description_en,
          title_lo,
          description_lo,
          Categories_en,
          Categories_lo,
          user_id: userId
        });

        const createdNews = await News.findOne({
          where: { news_id: news.news_id },
          attributes: ['news_id', 'headImg', 'subImgs', 'title_en', 'description_en', 'title_lo', 'description_lo', 'Categories_en', 'Categories_lo', 'createdAt']
        });

        res.status(201).json(createdNews);
      } catch (err) {
        console.error('Error creating news:', err);
        res.status(500).json({ error: err.message });
      }
    }
  ];
};

// Update news
exports.updateNews = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.fields([{ name: 'headImg', maxCount: 1 }, { name: 'subImgs', maxCount: 10 }]),
    async (req, res) => {
      try {
        const { id } = req.params;
        const { title_en, description_en, title_lo, description_lo, Categories_en, Categories_lo } = req.body;
        const headImg = req.files['headImg'] ? req.files['headImg'][0].filename : null;
        const subImgs = req.files['subImgs'] ? req.files['subImgs'].map(file => file.filename) : [];

        const existingNews = await News.findOne({ where: { news_id: id } });

        if (!existingNews) {
          return res.status(404).json({ error: 'News not found' });
        }

        if (headImg) {
          existingNews.headImg = path.join(folder, headImg);
        }

        if (subImgs.length > 0) {
          existingNews.subImgs = subImgs.map(img => path.join(folder, img));
        }

        existingNews.title_en = title_en || existingNews.title_en;
        existingNews.description_en = description_en || existingNews.description_en;
        existingNews.title_lo = title_lo || existingNews.title_lo;
        existingNews.description_lo = description_lo || existingNews.description_lo;
        existingNews.Categories_en = Categories_en || existingNews.Categories_en;
        existingNews.Categories_lo = Categories_lo || existingNews.Categories_lo;

        await existingNews.save();

        const updatedNews = await News.findOne({
          where: { news_id: id },
          attributes: ['news_id', 'headImg', 'subImgs', 'title_en', 'description_en', 'title_lo', 'description_lo', 'Categories_en', 'Categories_lo']
        });

        res.status(200).json(updatedNews);
      } catch (err) {
        console.error('Error updating news:', err);
        res.status(500).json({ error: err.message });
      }
    }
  ];
};

// Delete news
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await News.destroy({
      where: { news_id: id }
    });
    if (deleted) {
      res.status(204).send("News deleted");
    } else {
      throw new Error("News not found");
    }
  } catch (err) {
    console.error('Error deleting news:', err);
    res.status(500).json({ error: err.message });
  }
};

// Search news by title or description
exports.searchNews = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const news = await News.findAll({
      where: {
        [Op.or]: [
          { title_en: { [Op.like]: `%${query}%` } },
          { description_en: { [Op.like]: `%${query}%` } },
          { title_lo: { [Op.like]: `%${query}%` } },
          { description_lo: { [Op.like]: `%${query}%` } }
        ]
      },
      order: [['createdAt', 'DESC']]
    });

    const baseResponse = news.map(item => ({
      news_id: item.news_id,
      title: req.headers['accept-language'] === 'lo' ? item.title_lo : item.title_en,
      headImg: item.headImg ? `${req.protocol}://${req.get('host')}/ImageUpload/${item.headImg}` : null,
      subImgs: item.subImgs ? item.subImgs.map(img => `${req.protocol}://${req.get('host')}/ImageUpload/${img}`) : [],
      createdAt: item.createdAt,
      Categories_en: item.Categories_en,
      Categories_lo: item.Categories_lo,
      description_en: item.description_en,
      description_lo: item.description_lo
    }));

    res.json(baseResponse);
  } catch (err) {
    console.error('Error searching news:', err);
    res.status(500).json({ error: err.message });
  }
};
