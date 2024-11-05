const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const createImageUpload = require("../configs/multerConfig");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");

require("dotenv").config();

// Function to handle image upload

// User Registration
exports.register = async (req, res) => {
  const { name, lastname, email, phone, password, role } = req.body;
  try {
    if (!name || !lastname || !email || !phone || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      lastname,
      email,
      phone,
      password: hashedPassword,
      role,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(`Attempting login for email: ${email}`);

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log(`user not found...: ${email}`);
      return res.status(404).json({ error: "user not found." });
    }
    console.log(`User found: ${email}`);
    console.log(`Stored password hash: ${user.password}`);
    console.log(`Password to compare: ${password}`);

    // Compare input password with stored hashed password
    const match = await bcrypt.compare(password, user.password);
    console.log(`Password match result: ${match}`);
    if (!match) {
      console.log(`Password mismatch for user: ${email}`);
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate JWT token if password matches
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(`Login error for user: ${email}`, error);
    res.status(500).json({ error: error.message });
  }
};

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    // Extract token from Authorization header
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Token required" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token required" });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Find the user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "user not found.." });
    }

    // Process the profile image
    const profileImagePath = user.profile_image
      ? path.join(__dirname, "../ImageUpload", user.profile_image)
      : null;
    const profileImage =
      profileImagePath && fs.existsSync(profileImagePath)
        ? `data:image/png;base64,${fs
            .readFileSync(profileImagePath)
            .toString("base64")}`
        : null;

    // Construct response
    const profileResponse = {
      ...user.toJSON(),
      profile_image: profileImage,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      blog_description_en: user.blog_description_en,
      blog_description_lo: user.blog_description_lo,
    };

    res.json(profileResponse);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: err.message });
  }
};

// Upload User Profile Image

exports.uploadProfileImage = async (req, res) => {
  const uploadProfileImage = createImageUpload("profile");

  // Handle multer middleware
  uploadProfileImage.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      // Check for Authorization header
      if (!req.headers.authorization) {
        return res.status(401).json({ error: "Token required" });
      }

      // Extract token from Authorization header
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "Token required" });
      }

      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      // Find user and update profile image
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "user not found.." });
      }

      // Update user profile with image path
      if (req.file) {
        user.profile_image = req.file.filename
          ? path.join("profile", req.file.filename)
          : null;
      } else {
        user.profile_image = null; // Handle case where no file is uploaded
      }
      await user.save();

      res
        .status(200)
        .json({
          message: "Profile image updated successfully",
          file: req.file,
        });
    } catch (err) {
      console.error("Error updating user profile image:", err);
      res
        .status(500)
        .json({ error: "Error updating user profile", details: err.message });
    }
  });
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "user not found.." });
    }
    const profileImagePath = user.profile_image
      ? path.join(__dirname, "../ImageUpload", user.profile_image)
      : null;
    const profileImage =
      profileImagePath && fs.existsSync(profileImagePath)
        ? `data:image/png;base64,${fs
            .readFileSync(profileImagePath)
            .toString("base64")}`
        : null;

    // Construct response
    const profileResponse = {
      ...user.toJSON(),
      profile_image: profileImage,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      blog_description_en: user.blog_description_en,
      blog_description_lo: user.blog_description_lo,
    };

    res.json(profileResponse);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: {
          [Op.ne]: "Admin",
        },
      },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { name, lastname, email, phone, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      lastname,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete User
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "user not found." });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user", error });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const {
    name,
    lastname,
    email,
    phone,
    password,
    role,
    blog_description_en,
    blog_description_lo,
  } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    user.name = name || user.name;
    user.lastname = lastname || user.lastname;
    user.phone = phone || user.phone;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    user.role = role || user.role;

    // Update new fields
    user.blog_description_en = blog_description_en || user.blog_description_en;
    user.blog_description_lo = blog_description_lo || user.blog_description_lo;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user", error });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.newUserUpdate = async (req, res) => {
  const userId = req.params.id;
  const {
    name,
    lastname,
    email,
    phone,
    blog_description_en,
    blog_description_lo,
  } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "user not found..." });
    }

    user.name = name || user.name;
    user.lastname = lastname || user.lastname;
    user.phone = phone || user.phone;
    user.email = email || user.email;
    // Update new fields
    user.blog_description_en = blog_description_en || user.blog_description_en;
    user.blog_description_lo = blog_description_lo || user.blog_description_lo;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user", error });
  }
};
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  console.log(req.body);

  // Make sure your middleware is correctly parsing the body
  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ error: "Current and new password are required." });
  }

  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Token required" });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(401).json({ error: "Incorrect current password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res
      .status(500)
      .json({ error: "Error updating password", details: error.message });
  }
};

// Password Reset Request

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a password reset token
    const resetToken = user.createPasswordResetToken();
    await user.save();

    // Set up email transporter
    const transporter = nodemailer.createTransport({
      host: "mail.mtosgroup.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Log transporter configuration
    console.log("Transporter configuration:", transporter);

    // Create the password reset URL
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    // Send the email
    const info = await transporter.sendMail({
      to: email, // Use the email from the request
      from: process.env.EMAIL_FROM, // Sender's email address
      subject: "Password Reset Request",
      html: `
    <p>Hello,</p>
    <p>We received a request to reset your password. If you made this request, please click the button below to reset your password:</p>
    <p style="text-start: center; padding: 30px 0px; ">
      <a href="${resetUrl}" style="background-color: #3dbfaf; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Your Password</a>
    </p>
    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    <p>Thank you,<br/>The TPS Construction Complete Combination Sole Co., Ltd Support Team:(+856)21 419191</p>
  `,
    });

    console.log("Email sent:", info);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error in requestPasswordReset:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Hash the token to compare with the stored hashed token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find the user by the hashed token and check if the token is still valid
    const user = await User.findOne({
      where: {
        reset_password_token: hashedToken,
        reset_password_expires: {
          [Op.gt]: Date.now(), // Token must be valid
        },
      },
    });

    // If no user is found or the token is expired, return an error
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Ensure newPassword is provided
    if (!newPassword) {
      return res.status(400).json({ error: "New password is required" });
    }

    // Validate newPassword (e.g., check length)
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "New password must be at least 6 characters long" });
    }

    // Hash the new password with bcrypt
    const saltRounds = 10; // Number of salt rounds
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update user record with new password and clear token details
    user.password = hashedPassword;
    user.reset_password_token = null;
    user.reset_password_expires = null;
    await user.save();

    // Respond with success message
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPassword endpoint:", error);
    res.status(500).json({ error: error.message });
  }
};
