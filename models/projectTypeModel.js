// models/projectType.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const ProjectType = sequelize.define(
  'ProjectType',
  {
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_name_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: `${process.env.TB_PREFIX}project_type`,
    timestamps: true,
  }
);

module.exports = ProjectType;