const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticateToken = require('../middlewares/authenticateToken');

// Apply the middleware to the route
router.post('/news/:news_id/comments', authenticateToken, commentController.createComment);
router.get('/news/:news_id/comments', commentController.getCommentsByNewsId);
router.put('/comments/:comment_id', authenticateToken, commentController.updateComment);
router.delete('/comments/:comment_id', authenticateToken, commentController.deleteComment);


module.exports = router;
