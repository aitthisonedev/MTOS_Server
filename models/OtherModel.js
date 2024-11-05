const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
require('dotenv').config();

const OtherContent = sequelize.define('OtherContent', {
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
  tableName: `${process.env.TB_PREFIX}othercontents`,
  timestamps: true
});

module.exports = OtherContent;
