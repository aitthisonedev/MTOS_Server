const ServiceDescription = require("../models/serviceDescriptionsModel");


// Get all service descriptions
exports.getAllServiceDescriptions = async (req, res) => {
  console.log("--------- GET HERE")
  try {
    let descriptions = await ServiceDescription.findOne();
    if (!descriptions) {
      return res.json({
        "mtosNameEn": "MTOS GROUP SOLE,. LTD",
        "mtosNameLo": "ບໍລິສັດ ເອັມທີໂອເອສ ກຣຸບ ຈຳຈັດຜູ້ດຽວ",
        "mtosDescriptionEn": "Our company specializes in construction, supplying industrial equipment, and office products. We offer large-scale construction services, provide industrial machinery, and retail office supplies like printers, stationery, and furniture.",
        "mtosDescriptionLo": "ບໍລິສັດຂອງພວກເຮົາເປັນຜູ້ຊໍານານດ້ານການກໍ່ສ້າງ, ຈັດຫາອຸປະກອນອຸດສາຫະກໍາ, ແລະຜະລິດຕະພັນສໍານັກງານ. ພວກເຮົາມີການບໍລິການກໍ່ສ້າງຂະໜາດໃຫຍ່, ຈັດຫາເຄື່ອງຈັກອຸດສາຫະກໍາ, ແລະຂາຍປະສົມສໍານັກງານເຊັ່ນເຄື່ອງພິມ, ເຄື່ອງຂຽນ, ແລະເຟີນິເຈີ.",
        "mmcbrNameEn": "MILLION MORE CONSTRUCTION BRIDGE ROAD SOLE CO.,LTD",
        "mmcbrNameLo": "ບໍລິສັດ ມີວລຽນມໍ ກໍ່ສ້າງ ຂົວ-ທາງ ຈຳກັດ ຜູ້ດຽວ",
        "mmcbrDescriptionEn": "MILLION MORE CONSTRUCTION BRIDGE ROAD SOLE CO.,LTD  is a specialized company focusing on the construction of roads and bridges in various areas. The company provides comprehensive services from design, construction, to project management, all adhering to international standards.",
        "mmcbrDescriptionLo": "MILLION MORE CONSTRUCTION BRIDGE ROAD SOLE CO.,LTD ເປັນບໍລິສັດທີ່ມີຄວາມຊໍານານດ້ານການກໍ່ສ້າງຖະໜົນແລະສະພານໃນພື້ນທີ່ຕ່າງໆ. ບໍລິສັດມີການບໍລິການຄົບວົງຈອນຕັ້ງແຕ່ການອອກແບບ, ການກໍ່ສ້າງ, ຫາການຈັດການໂຄງການ, ທັງໝົດຍຶດຕາມມາດຕະຖານສາກົນ.",
        "liengNameEn": "LIENNGERNCHALERN SOLE CO.,LTD",
        "liengNameLo": "ບໍລິສັດ ຫລຽນເງິນຈະເລີນ ຈຳກັດ ຜູ້ດຽວ",
        "liengDescriptionEn": "LIENNGERNCHALERN SOLE CO., LTD is an enterprise specializing in sourcing, logistics management, and providing supply chain services to address business challenges. The company aims to deliver efficient services and timely solutions to ensure customer success.",
        "liengDescriptionLo": "ບໍລິສັດ LIENNGERNCHALERN SOLE CO., LTD ເປັນບໍລິສັດທີ່ມີຄວາມຊໍານານດ້ານການຈັດຫາ, ການຈັດການໂລຈິສຕິກ, ແລະການຈັດຫາບໍລິການຫ່ວງໂຊ່ງເພື່ອແກ້ໄຂບັນຫາທາງທຸລະກິດ. ບໍລິສັດມຸ່ງໝັ້ນທີ່ຈະສົ່ງມອບບໍລິການທີ່ມີປະສິດທິພາບແລະການແກ້ໄຂທີ່ທັນເວລາເພື່ອໃຫ້ລູກຄ້າປະສົບຄວາມສໍາເລັດ.",
        "orderServicesNameEn": "ORDER SERVICES SOLE CO.,LTD",
        "orderServicesNameLo": "ບໍລິສັດ ອໍເດີເຊີວິກ ຈຳກັດ ຜູ້ດຽວ",
        "orderServicesDescriptionEn": "ORDER SERVICE SOLE CO., LTD is an enterprise specializing in sourcing, logistics management, and providing supply chain services to address business challenges. The company aims to deliver efficient services and timely solutions to ensure customer success..",
        "orderServicesDescriptionLo": "ບໍລິສັດ ORDER SERVICE SOLE CO., LTD ເປັນບໍລິສັດທີ່ມີຄວາມຊໍານານດ້ານການຈັດຫາ, ການຈັດການໂລຈິສຕິກ, ແລະການຈັດຫາບໍລິການຫ່ວງໂຊ່ງເພື່ອແກ້ໄຂບັນຫາທາງທຸລະກິດ. ບໍລິສັດມຸ່ງໝັ້ນທີ່ຈະສົ່ງມອບບໍລິການທີ່ມີປະສິດທິພາບແລະການແກ້ໄຂທີ່ທັນເວລາເພື່ອໃຫ້ລູກຄ້າປະສົບຄວາມສໍາເລັດ.",
        "gotenNameEn": "GOTEN SOLE CO.,LTD",
        "gotenNameLo": "ບໍລິສັດ ໂກເທັນ ຈຳກັດ ຜູ້ດຽວ",
        "gotenDescriptionEn": "GOTEN SOLE CO., LTDis an enterprise specializing in sourcing, logistics management, and providing supply chain services to address business challenges. The company aims to deliver efficient services and timely solutions to ensure customer success.",
        "gotenDescriptionLo": "ບໍລິສັດ GOTEN SOLE CO., LTD ເປັນບໍລິສັດທີ່ມີຄວາມຊໍານານດ້ານການຈັດຫາ, ການຈັດການໂລຈິສຕິກ, ແລະການຈັດຫາບໍລິການຫ່ວງໂຊ່ງເພື່ອແກ້ໄຂບັນຫາທາງທຸລະກິດ. ບໍລິສັດມຸ່ງໝັ້ນທີ່ຈະສົ່ງມອບບໍລິການທີ່ມີປະສິດທິພາບແລະການແກ້ໄຂທີ່ທັນເວລາເພື່ອໃຫ້ລູກຄ້າປະສົບຄວາມສໍາເລັດ.",
        "sandFactoryNameEn": "SAND FACTORY SOLE CO.,LTD",
        "sandFactoryNameLo": "ບໍລິສັດ ໂຮງງານ ຊາຍຟອກ ຈຳກັດ ຜູ້ດຽວ",
        "sandFactoryDescriptionEn": "At SAND FACTORY SOLE CO., LTD, we are a leading provider of construction materials, committed to delivering high-quality products for all your construction needs. Our extensive range of materials includes various types of sand, gravel, and other aggregates essential for building and infrastructure projects.",
        "sandFactoryDescriptionLo": "ທີ່ SAND FACTORY SOLE CO., LTD, ພວກເຮົາເປັນຜູ້ສະໜອງວັດຖຸກໍ່ສ້າງຊັ້ນນໍາ, ມຸ່ງໝັ້ນທີ່ຈະສົ່ງມອບຜະລິດຕະພັນທີ່ມີຄຸນນະພາບສູງສໍາລັບຄວາມຕ້ອງການການກໍ່ສ້າງທັງໝົດຂອງທ່ານ. ຜະລິດຕະພັນຂອງພວກເຮົາມີຫຼາຍປະເພດລວມທັງຊາຍ, ກອກ, ແລະວັດຖຸອື່ນໆທີ່ຈໍາເປັນສໍາລັບໂຄງການກໍ່ສ້າງແລະໂຄງສ້າງພື້ນຖານ."
      })
    }
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
      mtosNameEn,
      mtosNameLo,
      mtosDescriptionEn,
      mtosDescriptionLo,
      mmcbrNameEn,
      mmcbrNameLo,
      mmcbrDescriptionEn,
      mmcbrDescriptionLo,
      liengNameEn,
      liengNameLo,
      liengDescriptionEn,
      liengDescriptionLo,
      orderServicesNameEn,
      orderServicesNameLo,
      orderServicesDescriptionEn,
      orderServicesDescriptionLo,
      gotenNameEn,
      gotenNameLo,
      gotenDescriptionEn,
      gotenDescriptionLo,
      sandFactoryNameEn,
      sandFactoryNameLo,
      sandFactoryDescriptionEn,
      sandFactoryDescriptionLo
    } = req.body;

    let descriptions = await ServiceDescription.findOne();
    if (!descriptions) {
      descriptions = await ServiceDescription.create({
        mtosNameEn,
        mtosNameLo,
        mtosDescriptionEn,
        mtosDescriptionLo,
        mmcbrNameEn,
        mmcbrNameLo,
        mmcbrDescriptionEn,
        mmcbrDescriptionLo,
        liengNameEn,
        liengNameLo,
        liengDescriptionEn,
        liengDescriptionLo,
        orderServicesNameEn,
        orderServicesNameLo,
        orderServicesDescriptionEn,
        orderServicesDescriptionLo,
        gotenNameEn,
        gotenNameLo,
        gotenDescriptionEn,
        gotenDescriptionLo,
        sandFactoryNameEn,
        sandFactoryNameLo,
        sandFactoryDescriptionEn,
        sandFactoryDescriptionLo
      });
    } else {
      descriptions.mtosNameEn = mtosNameEn;
      descriptions.mtosNameLo = mtosNameLo;
      descriptions.mtosDescriptionEn = mtosDescriptionEn;
      descriptions.mtosDescriptionLo = mtosDescriptionLo;
      descriptions.mmcbrNameEn = mmcbrNameEn;
      descriptions.mmcbrNameLo = mmcbrNameLo;
      descriptions.mmcbrDescriptionEn = mmcbrDescriptionEn;
      descriptions.mmcbrDescriptionLo = mmcbrDescriptionLo;
      descriptions.liengNameEn = liengNameEn;
      descriptions.liengNameLo = liengNameLo;
      descriptions.liengDescriptionEn = liengDescriptionEn;
      descriptions.liengDescriptionLo = liengDescriptionLo;
      descriptions.orderServicesNameEn = orderServicesNameEn;
      descriptions.orderServicesNameLo = orderServicesNameLo;
      descriptions.orderServicesDescriptionEn = orderServicesDescriptionEn;
      descriptions.orderServicesDescriptionLo = orderServicesDescriptionLo;
      descriptions.gotenNameEn = gotenNameEn;
      descriptions.gotenNameLo = gotenNameLo;
      descriptions.gotenDescriptionEn = gotenDescriptionEn;
      descriptions.gotenDescriptionLo = gotenDescriptionLo;
      descriptions.sandFactoryNameEn = sandFactoryNameEn;
      descriptions.sandFactoryNameLo = sandFactoryNameLo;
      descriptions.sandFactoryDescriptionEn = sandFactoryDescriptionEn;
      descriptions.sandFactoryDescriptionLo = sandFactoryDescriptionLo;
      await descriptions.save();
    }

    res.status(200).json(descriptions);
  } catch (err) {
    console.error("Error updating service descriptions:", err);
    res.status(500).json({ error: err.message });
  }
};
