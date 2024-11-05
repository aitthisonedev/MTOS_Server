// models/projectImage.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const ProjectImage = sequelize.define(
  'ProjectImage',
  {
    seq_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_link: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: `${process.env.TB_PREFIX}project_image`, // Set table name directly
    timestamps: true, // Includes createdAt and updatedAt fields
  }
);

module.exports = ProjectImage;
