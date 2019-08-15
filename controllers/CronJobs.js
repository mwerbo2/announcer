const CronJob = require("cron").CronJob;
import { updateStatus } from "./statusUpdateController";

 const job = new CronJob("00 01 00 * * *", function() {
   updateStatus();
 });


export { job };
