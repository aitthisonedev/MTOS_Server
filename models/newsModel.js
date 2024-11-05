const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const News = sequelize.define(
  'News',
  {
    news_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    headImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subImgs: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    title_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_en: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title_lo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_lo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Categories_en: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Categories_lo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: `${process.env.TB_PREFIX}News`,
    timestamps: false,
  }
);

module.exports = News;
