import { createAnnouncement, getAllAnnouncements, getLiveAnnouncements, updateOrCreateAnnouncement, setAnnouncementStatus, getLiveAnnouncementWithStatus} from '../controllers/announcementcontroller';
import checkJwt from '../authConfig';

module.exports = (app) => {
    app.get('/announcements', getAllAnnouncements);
    // app.post('/announcements', createAnnouncement);
    app.post('/announcements', updateOrCreateAnnouncement)
    app.get('/announcements/live', getLiveAnnouncements)
    app.post('/announcements/status', setAnnouncementStatus)
    app.get('/announcements/liveStatus', getLiveAnnouncementWithStatus)
}
