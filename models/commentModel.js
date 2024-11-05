const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const News = require('./newsModel');

const Comment = sequelize.define(
  'Comment',
  {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    news_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: News,
        key: 'news_id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: `${process.env.TB_PREFIX}comments`,
    timestamps: false,
  }
);

News.hasMany(Comment, { foreignKey: 'news_id' });
Comment.belongsTo(News, { foreignKey: 'news_id' });

module.exports = Comment;
