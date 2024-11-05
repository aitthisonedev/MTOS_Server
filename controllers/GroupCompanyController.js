const GroupCompany = require('../models/GroupCompanyModel');
const path = require('path');
const fs = require('fs');
const createImageUpload = require('../configs/multerConfig');

// Get all group companies
exports.getAllGroupCompanies = async (req, res) => {
  try {
    const groupCompanies = await GroupCompany.findAll();
    const baseResponse = groupCompanies.map(item => {
      const logoUrl = item.logo ? `${req.protocol}://${req.get('host')}/ImageUpload/${item.logo}` : null;
      return {
        ...item.toJSON(),
        logo: logoUrl,
      };
    });
    res.json(baseResponse);
  } catch (err) {
    console.error('Error fetching group companies:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get group company by ID
exports.getGroupCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const groupCompany = await GroupCompany.findOne({ where: { id } });

    if (!groupCompany) {
      return res.status(404).json({ error: 'Group company not found' });
    }

    const logoUrl = groupCompany.logo ? `${req.protocol}://${req.get('host')}/ImageUpload/${groupCompany.logo}` : null;
    const response = {
      ...groupCompany.toJSON(),
      logo: logoUrl,
    };

    res.json(response);
  } catch (err) {
    console.error('Error fetching group company by ID:', err);
    res.status(500).json({ error: err.message });
  }
};

// Create or update group company
exports.createOrUpdateGroupCompany = (folder) => {
  const imageUpload = createImageUpload(folder);
  return [
    imageUpload.single('logo'),
    async (req, res) => {
      try {
        const { id, name, nameLA } = req.body;
        const logo = req.file ? path.join(folder, req.file.filename) : null;

        let groupCompany;
        if (id) {
          groupCompany = await GroupCompany.findByPk(id);
          if (groupCompany) {
            if (logo) {
              groupCompany.logo = logo;
            }
            groupCompany.name = name;
            groupCompany.nameLA = nameLA;
            await groupCompany.save();
          } else {
            groupCompany = await GroupCompany.create({ name, nameLA, logo });
          }
        } else {
          groupCompany = await GroupCompany.create({ name, nameLA, logo });
        }
        res.status(200).json(groupCompany);
      } catch (err) {
        console.error('Error creating or updating group company:', err);
        res.status(500).json({ error: err.message });
      }
    },
  ];
};

// Delete group company
exports.deleteGroupCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await GroupCompany.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send('Group company deleted');
    } else {
      throw new Error('Group company not found');
    }
  } catch (err) {
    console.error('Error deleting group company:', err);
    res.status(500).json({ error: err.message });
  }
};
