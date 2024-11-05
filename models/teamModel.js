const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

// Define the TeamMember model
const TeamMember = sequelize.define('TeamMember', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_en: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position_en: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description_en: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  name_lo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position_lo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description_lo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  facebook: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  whatsapp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: `${process.env.TB_PREFIX}team_members`,
  timestamps: true,
});

module.exports = TeamMember;
