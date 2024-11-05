// models/projectDetail.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const Project = require('./projectModel')
const ProjectDetail = sequelize.define(
  'ProjectDetail',
  {
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title_en: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description_en: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sub_image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: `${process.env.TB_PREFIX}project_detail`, // Set table name directly
    timestamps: true, // Includes createdAt and updatedAt fields
  }
);
// ProjectDetail.belongsTo(Project, { foreignKey: 'id', as: 'project' });
module.exports = ProjectDetail;
