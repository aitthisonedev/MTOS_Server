const Banners = require('../models/BranersModel');

exports.getBanners = async (req, res) => {
  try {
    const banners = await Banners.findAll();
    if (!banners) {
      return res.status(404).json({ message: 'No banners found' });
    }
    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrUpdateBanners = async (req, res) => {
  const { home_lo, home_en, about_lo, about_en, contact_lo, contact_en } = req.body;
  try {
    await Banners.upsert({ type: 'home_lo', value: home_lo });
    await Banners.upsert({ type: 'home_en', value: home_en });
    await Banners.upsert({ type: 'about_lo', value: about_lo });
    await Banners.upsert({ type: 'about_en', value: about_en });
    await Banners.upsert({ type: 'contact_lo', value: contact_lo });
    await Banners.upsert({ type: 'contact_en', value: contact_en });

    res.status(200).json({ message: 'Banners settings saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBanners = async (req, res) => {
  const { type } = req.params;
  try {
    const banner = await Banners.findOne({ where: { type } });
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    await banner.destroy();
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
