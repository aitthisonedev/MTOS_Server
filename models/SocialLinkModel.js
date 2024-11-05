const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
require('dotenv').config();

const SocialLink = sequelize.define('SocialLink', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: `${process.env.TB_PREFIX}sociallinks`,
  timestamps: true
});

module.exports = SocialLink;
