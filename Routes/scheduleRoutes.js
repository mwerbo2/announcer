import {
  createSchedule,
  getAllScheduled,
  getScheduleById,
  updateSchedule
} from "../controllers/scheduleController";
import checkJwt from "../authConfig";

module.exports = app => {
  app.get("/schedules/:id", getScheduleById);
  app.get("/schedules", getAllScheduled);
  app.post("/schedules", createSchedule);
  app.put("/schedules/:id", updateSchedule);
};
