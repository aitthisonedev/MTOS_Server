const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const ServiceDescription = sequelize.define("ServiceDescription", {
  construction_en: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  construction_lo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  import_export_en: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  import_export_lo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  gas_lpg_title_en: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gas_lpg_title_lo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gas_lpg_desc_en: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  gas_lpg_desc_lo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  crushing_plant_en: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  crushing_plant_lo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  apartment_en: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  apartment_lo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: `${process.env.TB_PREFIX}service_description`,
  timestamps: true,
});

module.exports = ServiceDescription;
