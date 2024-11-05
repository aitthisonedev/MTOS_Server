const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");
require("dotenv").config(); // Load environment variables

// Gallery Model
const Gallery = sequelize.define(
  "Gallery",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: `${process.env.TB_PREFIX}gallery`,
    timestamps: true,
  }
);

module.exports = Gallery;
