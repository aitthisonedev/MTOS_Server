const EmailUpdate = require('../models/EmailUpdateModel');

exports.getEmailUpdate = async (req, res) => {
  try {
    const emailUpdates = await EmailUpdate.findAll();
    if (!emailUpdates) {
      return res.status(404).json({ message: 'No email updates found' });
    }
    res.json(emailUpdates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrUpdateEmailUpdate = async (req, res) => {
  const { office, contact } = req.body;
  try {
    await EmailUpdate.upsert({ type: 'office', value: office });
    await EmailUpdate.upsert({ type: 'contact', value: contact });

    res.status(200).json({ message: 'Email settings saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEmailUpdate = async (req, res) => {
  const { type } = req.params;
  try {
    const emailUpdate = await EmailUpdate.findOne({ where: { type } });
    if (!emailUpdate) {
      return res.status(404).json({ message: 'Email update not found' });
    }
    await emailUpdate.destroy();
    res.status(200).json({ message: 'Email update deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
