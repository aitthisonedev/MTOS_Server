const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const HeadContent = sequelize.define(
  "HeadContent",
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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: `${process.env.TB_PREFIX || ''}head_content`,
    timestamps: true,
  }
);

module.exports = HeadContent; 