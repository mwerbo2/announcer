import Announcement from "../models/announcementmodel";
import Schedule from "../models/schedulemodel";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


const SetInactiveStatus = async () => {
    const currentDate = new Date();
    const beginningOfDay = currentDate.setHours(0, 0, 0, 0);
    const endOfDay = currentDate.setHours(23, 59, 59, 59);
    try {
        const post = await Announcement.update({
            status: 'archive'
        }, {
            include: [
            {
              model: Schedule,
              where: {
                date_time_start: {
                  [Op.lt]: endOfDay,
                  [Op.gt]: beginningOfDay
                }
              }
            }
          ]
        });
        return console.log('it worked', post);
      } catch (error) {
        return console.log('it did not', error)
      }
}


export {
    SetInactiveStatus
}