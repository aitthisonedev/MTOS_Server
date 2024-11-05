const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
require('dotenv').config();

const PhoneUpdate = sequelize.define('PhoneUpdate', {
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
  tableName: `${process.env.TB_PREFIX}phoneupdates`,
  timestamps: true
});

module.exports = PhoneUpdate;
