const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

const uploadFolder = 'uploads/news'; // Define your upload folder

router.get('/search', newsController.searchNews);
router.get('/:id', newsController.getNewsById);
router.post('/', newsController.createNews(uploadFolder));
router.put('/:id', newsController.updateNews(uploadFolder));
router.delete('/:id', newsController.deleteNews);

// Add search route
router.get('/', newsController.getAllNews);

module.exports = router;
