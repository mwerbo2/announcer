import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
const path = require("path");
let app = express();
require("dotenv").config();
const PORT = 3001;

//Sequelize initialization
import { sequelize } from "./config/config";
import Announcement from "./models/announcementmodel";
import Schedule from "./models/schedulemodel";
import Board from "./models/boardModel";
import { job } from "./controllers/CronJobs";
Announcement.hasOne(Schedule, { unique: true });
Board.hasMany(Announcement);
sequelize.sync();
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

job.start();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./routes/weatherRoutes")(app);
require("./routes/announcementRoutes")(app);
require("./routes/scheduleRoutes")(app);
require("./routes/boardRoutes")(app);

app.use(express.static(`client/build`));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server.js 72 Running on port: ${PORT}`);
});
