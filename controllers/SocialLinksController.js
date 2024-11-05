const SocialLink = require('../models/SocialLinkModel');

exports.getSocialLinks = async (req, res) => {
  try {
    const socialLinks = await SocialLink.findAll();
    if (!socialLinks) {
      return res.status(404).json({ message: 'No social links found' });
    }
    res.json(socialLinks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrUpdateSocialLink = async (req, res) => {
  const { facebook, whatsapp, wechat, call } = req.body;
  try {
    await SocialLink.upsert({ type: 'facebook', value: facebook });
    await SocialLink.upsert({ type: 'whatsapp', value: whatsapp });
    await SocialLink.upsert({ type: 'wechat', value: wechat });
    await SocialLink.upsert({ type: 'call', value: call });

    res.status(200).json({ message: 'Social media links saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSocialLink = async (req, res) => {
  const { type } = req.params;
  try {
    const socialLink = await SocialLink.findOne({ where: { type } });
    if (!socialLink) {
      return res.status(404).json({ message: 'Social link not found' });
    }
    await socialLink.destroy();
    res.status(200).json({ message: 'Social link deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
