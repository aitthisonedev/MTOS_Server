const TeamMember = require("../models/teamModel");
const fs = require("fs");
const path = require("path");
const createImageUpload = require("../configs/multerConfig");

// Get all team members
exports.getAllTeamMembers = async (req, res) => {
  try {
    const team = await TeamMember.findAll();
    const baseResponse = team.map(member => {
      return {
        ...member.toJSON(),
        image: member.image ? `/ImageUpload/${member.image}` : null,
      };
    });
    res.json(baseResponse);
  } catch (err) {
    console.error('Error fetching team:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get team member by ID
exports.getTeamMemberById = async (req, res) => {
try {
  const { id } = req.params;
  const teamMember = await TeamMember.findOne({ where: { id } });

  if (!teamMember) {
    return res.status(404).json({ error: "Team member not found" });
  }

  const imagePath = teamMember.image
    ? `/ImageUpload/${teamMember.image}`
    : null;

  const response = {
    ...teamMember.toJSON(),
    image: imagePath,
  };

  res.json(response);
} catch (err) {
  console.error("Error fetching team member by ID:", err);
  res.status(500).json({ error: err.message });
}
};

// Create team member
exports.createTeamMember = (folder) => {
const imageUpload = createImageUpload(folder);
return [
  imageUpload.single("image"),
  async (req, res) => {
    try {
      const {
        name_en,
        position_en,
        description_en,
        name_lo,
        position_lo,
        description_lo,
        facebook,
        whatsapp,
        phone,
      } = req.body;
      const image = req.file ? req.file.filename : null;

      const teamMember = await TeamMember.create({
        name_en,
        position_en,
        description_en,
        name_lo,
        position_lo,
        description_lo,
        facebook,
        whatsapp,
        phone,
        image: image ? path.join(folder, image) : null,
      });

      res.status(201).json(teamMember);
    } catch (err) {
      console.error("Error creating team member:", err);
      res.status(500).json({ error: err.message });
    }
  },
];
};

// Update team member
exports.updateTeamMember = (folder) => {
const imageUpload = createImageUpload(folder);
return [
  imageUpload.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name_en,
        position_en,
        description_en,
        name_lo,
        position_lo,
        description_lo,
        facebook,
        whatsapp,
        phone,
      } = req.body;
      const image = req.file ? req.file.filename : null;

      const existingMember = await TeamMember.findOne({ where: { id } });

      if (!existingMember) {
        return res.status(404).json({ error: "Team member not found" });
      }

      existingMember.name_en = name_en || existingMember.name_en;
      existingMember.position_en = position_en || existingMember.position_en;
      existingMember.description_en = description_en || existingMember.description_en;
      existingMember.name_lo = name_lo || existingMember.name_lo;
      existingMember.position_lo = position_lo || existingMember.position_lo;
      existingMember.description_lo = description_lo || existingMember.description_lo;
      existingMember.facebook = facebook || existingMember.facebook;
      existingMember.whatsapp = whatsapp || existingMember.whatsapp;
      existingMember.phone = phone || existingMember.phone;
      if (image) {
        existingMember.image = path.join(folder, image);
      }

      await existingMember.save();
      res.status(200).json(existingMember);
    } catch (err) {
      console.error("Error updating team member:", err);
      res.status(500).json({ error: err.message });
    }
  },
];
};

// Delete team member
exports.deleteTeamMember = async (req, res) => {
try {
  const { id } = req.params;
  const deleted = await TeamMember.destroy({
    where: { id },
  });
  if (deleted) {
    res.status(204).send("Team member deleted");
  } else {
    throw new Error("Team member not found");
  }
} catch (err) {
  console.error("Error deleting team member:", err);
  res.status(500).json({ error: err.message });
}
};
