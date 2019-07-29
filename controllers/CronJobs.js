const CronJob = require("cron").CronJob;
import Announcement from "../models/announcementmodel";
import Schedule from "../models/schedulemodel";
// import StatusUpdate from "";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import {
  getLiveAnnouncementWithStatus,
  getAllAnnouncements
} from "./announcementcontroller";
import { SetInactiveStatus, updateStatus } from "./statusUpdateController";

const job = new CronJob("*/1 * * * *", function() {
  // Update the statuses at midnight
  console.log("Firing Cronjob to update status");
  // SetInactiveStatus();
  updateStatus();
});
console.log("After job instantiation");
// job.start();

export { job };
