const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const SlidePerformance = sequelize.define(
  "SlidePerformance",
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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: `${process.env.TB_PREFIX || ''}slide_performance`,
    timestamps: true,
  }
);

module.exports = SlidePerformance; 