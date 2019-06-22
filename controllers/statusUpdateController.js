import Announcement from "../models/announcementmodel";
import Schedule from "../models/schedulemodel";
const Sequelize = require("sequelize");
const moment = require("moment");
const Op = Sequelize.Op;

// Return the announcement status based on the date_time start and end
const setStatus = (dateStart, dateEnd) => {
  const currentDate = moment().format("YYYY-MM-DD");
  const formattedStart = moment(dateStart).format("YYYY-MM-DD");
  const formattedEnd = moment(dateEnd).format("YYYY-MM-DD");

  if (formattedStart > currentDate && formattedEnd > currentDate) {
    return "scheduled";
  } else if (formattedStart <= currentDate && formattedEnd >= currentDate) {
    return "active";
  } else {
    return "inactive";
  }
};

const SetInactiveStatus = async () => {
  const currentDate = new Date();
  const beginningOfDay = currentDate.setHours(0, 0, 0, 0);
  const endOfDay = currentDate.setHours(23, 59, 59, 59);
  try {
    const post = await Announcement.update(
      {
        status: "archive"
      },
      {
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
      }
    );
  } catch (error) {}
};

export { SetInactiveStatus, setStatus };
