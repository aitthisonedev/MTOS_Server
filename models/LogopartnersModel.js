const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Logopartner = sequelize.define(
  'Logopartner',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: `${process.env.TB_PREFIX}logopartners`, 
    timestamps: true,
  }
);

module.exports = Logopartner;
