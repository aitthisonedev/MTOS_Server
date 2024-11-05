
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Project = sequelize.define(
  'Project',
  {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    coverImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subImgs: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    projectName_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectName_lo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location_lo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title_lo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_en: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description_lo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    moreDescription_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    moreDescription_lo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content_one: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content_two: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content_three: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectType: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: `${process.env.TB_PREFIX}projects`,
    timestamps: false,
  }
);

// Project.sync({ force: true });
module.exports = Project;

