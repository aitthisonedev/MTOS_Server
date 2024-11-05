const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

// Define the Testimonial model
const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_en: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name_lo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country_en: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country_lo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clients_en: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  clients_lo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: `${process.env.TB_PREFIX}testimonial`,
  timestamps: true,
});

module.exports = Testimonial;
