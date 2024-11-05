// Import dotenv to load environment variables
require('dotenv').config();

const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const CrushingPlant = sequelize.define(
  "CrushingPlant",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: `${process.env.TB_PREFIX || ''}crushing_plant`,
    timestamps: true,
  }
);

module.exports = CrushingPlant;
