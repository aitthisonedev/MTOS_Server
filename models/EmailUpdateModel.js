const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
require('dotenv').config();

const EmailUpdate = sequelize.define('EmailUpdate', {
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
  tableName: `${process.env.TB_PREFIX}emailupdates`,
  timestamps: true
});

module.exports = EmailUpdate;
