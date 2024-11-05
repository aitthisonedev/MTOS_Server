const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const crypto = require('crypto');
require('dotenv').config(); // Ensure .env is loaded

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    reset_password_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    reset_password_expires: {
        type: DataTypes.DATE,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    profile_image: {
        type: DataTypes.STRING(255), // URL or file path to the profile image
        allowNull: true
    },
    blog_description_en: {
        type: DataTypes.TEXT, // English blog description
        allowNull: true
    },
    blog_description_lo: {
        type: DataTypes.TEXT, // Lao blog description
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false,
    tableName: `${process.env.TB_PREFIX}users` // Use TB_PREFIX from .env for table name
});

// Method to create password reset token
User.prototype.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.reset_password_token = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.reset_password_expires = Date.now() + 30 * 60 * 1000; // Token valid for 30 minutes

    return resetToken;
};

module.exports = User;
