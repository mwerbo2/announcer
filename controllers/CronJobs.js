const CronJob = require("cron").CronJob;
import { updateStatus } from "./statusUpdateController";

// Update the statuses at 12:01am
const job = new CronJob("00 01 00 * * *", function() {
  updateStatus();
});

export { job };
