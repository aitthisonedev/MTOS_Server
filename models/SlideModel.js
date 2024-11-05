const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Slider = sequelize.define(
  'Slider',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: `${process.env.TB_PREFIX}sliders`,
    timestamps: true,
  }
);

module.exports = Slider;
