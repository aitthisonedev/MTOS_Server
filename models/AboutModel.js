const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const About = sequelize.define(
  "About",
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
    imageOne: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageTwo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: `${process.env.TB_PREFIX || ''}about`,
    timestamps: true,
  }
);

module.exports = About;
