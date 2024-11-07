const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Proses = sequelize.define(
  "Proses",
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
  },
  {
    tableName: `${process.env.TB_PREFIX || ''}proses`,
    timestamps: true,
  }
);

module.exports = Proses; 