const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
require('dotenv').config();

const ImageUpload = sequelize.define('ImageUpload', {
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    seqID: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: `${process.env.TB_PREFIX}imageUpload`,
    timestamps: true
});

module.exports = ImageUpload;
