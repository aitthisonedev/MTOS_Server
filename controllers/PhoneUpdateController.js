const PhoneUpdate = require('../models/PhoneUpdateModel');

exports.getPhoneUpdate = async (req, res) => {
  try {
    const phoneUpdates = await PhoneUpdate.findAll();
    if (!phoneUpdates) {
      return res.status(404).json({ message: 'No phone updates found' });
    }
    res.json(phoneUpdates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrUpdatePhoneUpdate = async (req, res) => {
  const { office_number, phone_number, seno_Number,pakse_Number } = req.body;
  try {
    await PhoneUpdate.upsert({ type: 'office_number', value: office_number });
    await PhoneUpdate.upsert({ type: 'phone_number', value: phone_number });
    await PhoneUpdate.upsert({ type: 'seno_Number', value: seno_Number });
    await PhoneUpdate.upsert({ type: 'pakse_Number', value: pakse_Number });

    res.status(200).json({ message: 'Phone settings saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePhoneUpdate = async (req, res) => {
  const { type } = req.params;
  try {
    const phoneUpdate = await PhoneUpdate.findOne({ where: { type } });
    if (!phoneUpdate) {
      return res.status(404).json({ message: 'Phone update not found' });
    }
    await phoneUpdate.destroy();
    res.status(200).json({ message: 'Phone update deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
