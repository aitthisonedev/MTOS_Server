const ServiceDescription = require("../models/serviceDescriptionsModel");

// Get all service descriptions
exports.getAllServiceDescriptions = async (req, res) => {
  try {
    const descriptions = await ServiceDescription.findOne();
    res.json(descriptions);
  } catch (err) {
    console.error("Error fetching service descriptions:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update service descriptions
exports.updateServiceDescriptions = async (req, res) => {
  try {
    const {
      construction_en,
      construction_lo,
      import_export_en,
      import_export_lo,
      gas_lpg_title_en,
      gas_lpg_title_lo,
      gas_lpg_desc_en,
      gas_lpg_desc_lo,
      crushing_plant_en,
      crushing_plant_lo,
      apartment_en,
      apartment_lo,
    } = req.body;

    let descriptions = await ServiceDescription.findOne();
    if (!descriptions) {
      descriptions = await ServiceDescription.create({
        construction_en,
        construction_lo,
        import_export_en,
        import_export_lo,
        gas_lpg_title_en,
        gas_lpg_title_lo,
        gas_lpg_desc_en,
        gas_lpg_desc_lo,
        crushing_plant_en,
        crushing_plant_lo,
        apartment_en,
        apartment_lo,
      });
    } else {
      descriptions.construction_en = construction_en;
      descriptions.construction_lo = construction_lo;
      descriptions.import_export_en = import_export_en;
      descriptions.import_export_lo = import_export_lo;
      descriptions.gas_lpg_title_en = gas_lpg_title_en;
      descriptions.gas_lpg_title_lo = gas_lpg_title_lo;
      descriptions.gas_lpg_desc_en = gas_lpg_desc_en;
      descriptions.gas_lpg_desc_lo = gas_lpg_desc_lo;
      descriptions.crushing_plant_en = crushing_plant_en;
      descriptions.crushing_plant_lo = crushing_plant_lo;
      descriptions.apartment_en = apartment_en;
      descriptions.apartment_lo = apartment_lo;
      await descriptions.save();
    }

    res.status(200).json(descriptions);
  } catch (err) {
    console.error("Error updating service descriptions:", err);
    res.status(500).json({ error: err.message });
  }
};
