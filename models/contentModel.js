const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Content = sequelize.define(
  "Content",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titleOne_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titleOne_lo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descriptionOne_en: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descriptionOne_lo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descriptionTwo_en: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descriptionTwo_lo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: `${process.env.TB_PREFIX || ''}content`,
    timestamps: true,
  }
);

module.exports = Content; 