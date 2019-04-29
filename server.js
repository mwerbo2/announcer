import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
const path = require('path');
let app = express();
require("dotenv").config();
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
const port = 3001;

//Sequelize initialization
import { sequelize } from "./config/config";
import Announcement from "./models/announcementmodel";
import Schedule from "./models/schedulemodel";
import Board from './models/boardModel';
import { job } from './controllers/CronJobs';
import { getAllAnnouncements } from './controllers/announcementcontroller';
Announcement.hasOne(Schedule);
Schedule.belongsTo(Announcement);
Board.hasMany(Announcement);
sequelize.sync();
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res)=>{
  console.log('Hello')
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

// app.get("/", (req, res) => res.send("Welcome to Announce API"));

// require('./Routes/userRoutes')(app);
require("./Routes/weatherRoutes")(app);
require("./Routes/announcementRoutes")(app);
require("./Routes/scheduleRoutes")(app);
require("./Routes/boardRoutes")(app);

app.use(express.static(`client/build`) );
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

// getAllAnnouncements();
// job.start();

app.listen(port, () => {
  console.log(`server.js Running on port: ${port}`);
});