const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

// Define the About model
const About = sequelize.define("About", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title_en: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description_en: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    mission: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    mission_en: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    vision: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    vision_en: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    tableName: `${process.env.TB_PREFIX}about`,
    timestamps: false
});

module.exports = About;
