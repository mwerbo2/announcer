const CronJob = require("cron").CronJob;
import Announcement from "../models/announcementmodel";
import Schedule from "../models/schedulemodel";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import {
  getLiveAnnouncementWithStatus,
  getAllAnnouncements
} from "./announcementcontroller";
import { SetInactiveStatus } from "./statusUpdateController";

console.log("Before job instantiation");
const job = new CronJob("* * * * * *", function() {
  // getLiveAnnouncementWithStatus();

  SetInactiveStatus();
});
console.log("After job instantiation");
// job.start();

export { job };
