const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const GroupCompany = sequelize.define(
  'GroupCompany',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameLA: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: `${process.env.TB_PREFIX}groupcompanies`,
    timestamps: true,
  }
);

module.exports = GroupCompany;
