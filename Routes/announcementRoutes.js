import { createAnnouncement, getAllAnnouncements, getLiveAnnouncements, updateAnnoucement, updateOrCreateAnnouncement, setAnnouncementStatus, getLiveAnnouncementWithStatus, getLiveAnnouncementsRonak} from '../controllers/announcementcontroller';
import checkJwt from '../authConfig';

module.exports = (app) => {
    app.get('/announcements', getAllAnnouncements);
    app.post('/announcements', createAnnouncement);
    app.put('/announcements/:id', updateAnnoucement)
    // app.post('/announcements', updateOrCreateAnnouncement)
    app.get('/announcements/live', getLiveAnnouncements)
    app.post('/announcements/status', setAnnouncementStatus)
    app.get('/announcements/liveStatus', getLiveAnnouncementWithStatus)
    app.get('/fuck', getLiveAnnouncementsRonak);
}
