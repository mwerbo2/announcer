const CronJob = require("cron").CronJob;
import Announcement from "../models/announcementmodel";
import Schedule from "../models/schedulemodel";
import StatusUpdate from "";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import {
  getLiveAnnouncementWithStatus,
  getAllAnnouncements
} from "./announcementcontroller";
import { SetInactiveStatus } from "./statusUpdateController";


const job = new CronJob("* * * * * *", function() {
  // Update the statuses at midnight
  console.log("this should fire");
  // SetInactiveStatus();
});
console.log("After job instantiation");
// job.start();

export { job };
