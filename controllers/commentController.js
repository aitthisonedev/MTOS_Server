const Comment = require('../models/commentModel');
const News = require('../models/newsModel');
const authenticateToken = require('../middlewares/authenticateToken'); // Import the middleware

exports.getCommentsByNewsId = async (req, res) => {
  try {
    const { news_id } = req.params;
    const comments = await Comment.findAll({ where: { news_id } });
    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createComment = [authenticateToken, async (req, res) => {
  try {
    const { news_id } = req.params;
    const { content } = req.body;
    const user_id  = req.user.id; // Extract user_id from the verified token
    console.log('userid',user_id)

    // Ensure the news item exists before creating a comment
    const news = await News.findByPk(news_id);
    if (!news) return res.status(404).json({ error: 'News not found' });

    const comment = await Comment.create({ 
      news_id, 
      user_id, 
      content });
    res.status(201).json(comment);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ error: err.message });
  }
}];

exports.updateComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const { content } = req.body;
    const [updated] = await Comment.update({ content }, { where: { comment_id } });
    if (updated) {
      const updatedComment = await Comment.findOne({ where: { comment_id } });
      res.status(200).json(updatedComment);
    } else {
      throw new Error('Comment not found');
    }
  } catch (err) {
    console.error('Error updating comment:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const deleted = await Comment.destroy({ where: { comment_id } });
    if (deleted) {
      res.status(204).send('Comment deleted');
    } else {
      throw new Error('Comment not found');
    }
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ error: err.message });
  }
};
