const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const ServiceDescription = sequelize.define("ServiceDescription", {
  mtosNameEn: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mtosNameLo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mtosDescriptionEn: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  mtosDescriptionLo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  mmcbrNameEn: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mmcbrNameLo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mmcbrDescriptionEn: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  mmcbrDescriptionLo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  liengNameEn: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  liengNameLo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  liengDescriptionEn: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  liengDescriptionLo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  orderServicesNameEn: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  orderServicesNameLo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  orderServicesDescriptionEn: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  orderServicesDescriptionLo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  gotenNameEn: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gotenNameLo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gotenDescriptionEn: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  gotenDescriptionLo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  sandFactoryNameEn: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sandFactoryNameLo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sandFactoryDescriptionEn: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  sandFactoryDescriptionLo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: `${process.env.TB_PREFIX}service_description`,
  timestamps: true,
});

// ServiceDescription.sync({ force: true });
module.exports = ServiceDescription;
