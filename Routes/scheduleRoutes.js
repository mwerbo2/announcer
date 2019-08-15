import {
  createSchedule,
  getAllScheduled,
  getScheduleById,
  updateSchedule
} from "../controllers/scheduleController";
import checkJwt from "../authConfig";
import { updateStatus } from "../controllers/statusUpdateController"

module.exports = app => {
  app.get("/schedules/:id", getScheduleById);
  app.get("/schedules", getAllScheduled);
  app.post("/schedules", checkJwt, createSchedule);
  app.put("/schedules/:id", checkJwt, updateSchedule);
};
