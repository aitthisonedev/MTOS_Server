const OtherContent = require('../models/OtherModel');

exports.getOtherContents = async (req, res) => {
  try {
    const otherContents = await OtherContent.findAll();
    if (!otherContents) {
      return res.status(404).json({ message: 'No other contents found' });
    }
    res.json(otherContents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrUpdateOtherContent = async (req, res) => {
  const { address_lao, address_english, footer_lao, footer_english } = req.body;
  try {
    await OtherContent.upsert({ type: 'address_lao', value: address_lao });
    await OtherContent.upsert({ type: 'address_english', value: address_english });
    await OtherContent.upsert({ type: 'footer_lao', value: footer_lao });
    await OtherContent.upsert({ type: 'footer_english', value: footer_english });

    res.status(200).json({ message: 'Other contents saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOtherContent = async (req, res) => {
  const { type } = req.params;
  try {
    const otherContent = await OtherContent.findOne({ where: { type } });
    if (!otherContent) {
      return res.status(404).json({ message: 'Other content not found' });
    }
    await otherContent.destroy();
    res.status(200).json({ message: 'Other content deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
