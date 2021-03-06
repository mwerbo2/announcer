import {
  createAnnouncement,
  getAllAnnouncements,
  getLiveAnnouncements,
  updateAnnoucement,
  updateOrCreateAnnouncement,
  setAnnouncementStatus,
  getLiveAnnouncementWithStatus,
  getLiveAnnouncementsRonak,
  getAnnouncementByStatus
} from "../controllers/announcementcontroller";
import checkJwt from "../authConfig";

module.exports = app => {
  app.get("/announcements", getAllAnnouncements);
  app.post("/announcements", checkJwt, createAnnouncement);
  app.put("/announcements/:id", checkJwt, updateAnnoucement);
  app.get("/announcements/live", getLiveAnnouncements);
  app.post("/announcements/status", checkJwt, setAnnouncementStatus);
  app.get("/announcements/liveStatus", getLiveAnnouncementsRonak);
  app.get("/announcements/status", getAnnouncementByStatus);
};
