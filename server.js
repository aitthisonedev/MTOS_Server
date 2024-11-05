const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const checkUserExists = require("./middlewares/checkUser");
const sequelize = require("./configs/database"); // Using the Sequelize instance from configs

require("dotenv").config(); // Load environment variables

/*------- Import Routes -------*/
const newsRoutes = require("./routes/newsRoutes");
const userRoutes = require("./routes/usersRoute");
const projectRoutes = require("./routes/projectRoutes");
const projectTypeRoutes = require("./routes/projectTypeRoutes");
const projectDetailRoutes = require("./routes/projectDetailRoutes");
const projectImageRoutes = require("./routes/projectImageRoutes");
const imageUploadRoutes = require("./routes/imageUploadRoutes");
const emailUpdateRoutes = require("./routes/EmailUpdateRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const branersRoutes = require("./routes/BranersRoutes");
const phoneUpdatesRoutes = require("./routes/PhoneUpdateRoutes");
const socialMediaRoutes = require("./routes/SocialLinkRoutes");
const otherContentRoutes = require("./routes/OtherRoutes");
const commentRoutes = require("./routes/commentRoutes");
const PartnerRoutes = require("./routes/LogopartnersRoutes");
const teamRoutes = require("./routes/teamRoutes");
const testimonialsRoutes = require("./routes/testimonialRoutes");
const slideRouter = require("./routes/SlideRouter");
const galleryRoutes = require("./routes/GalleryRouter");
const crushingPlantRouter = require("./routes/crushingPlantRouter");
const serviceDescriptionsRoutes = require("./routes/serviceDescriptionsRoutes");
const groupCompanyRoutes = require("./routes/GroupCompanyRouter");

/*------- Express App Setup -------*/
const app = express();

app.use(cors());

// Body parsing middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/ImageUpload', express.static(path.join(__dirname, 'ImageUpload')));

// Serve static files


console.log(path.join(__dirname, 'ImageUpload'));

// Apply user check middleware
app.use(checkUserExists);

/*------- API Routes -------*/
app.use("/api/users", userRoutes);
app.use("/api/News", newsRoutes);
app.use("/api/projects", projectRoutes);
// app.use('/api/logoupdates', logoUpdateRoutes);
app.use("/api/project-types", projectTypeRoutes);
app.use("/api/project-details", projectDetailRoutes);
app.use("/api/project-images", projectImageRoutes);
app.use("/api/imageUpload", imageUploadRoutes);
app.use("/api/email-updates", emailUpdateRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/braners", branersRoutes);
app.use("/api/logoPartners", PartnerRoutes);
app.use("/api/phone-updates", phoneUpdatesRoutes);
app.use("/api/social-links", socialMediaRoutes);
app.use("/api/other-contents", otherContentRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api", commentRoutes);
app.use("/api/sliders", slideRouter);
app.use("/api/gallery", galleryRoutes);
app.use("/api/crushing-plants", crushingPlantRouter);
app.use("/api/service-descriptions", serviceDescriptionsRoutes);
app.use("/api/groupComPanies", groupCompanyRoutes);


/*------- Database Connection and Sync -------*/
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");

    // Sync the models with the database
    sequelize
      .sync()
      .then(() => {
        console.log("Database & tables created!");

        // Start the server after successful DB connection and sync
        const PORT = process.env.PORT || 3600;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      })
      .catch((err) => {
        console.error("Unable to sync the database:", err);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the process if the connection fails
  });

module.exports = sequelize;
