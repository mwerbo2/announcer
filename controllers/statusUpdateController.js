import Announcement from "../models/announcementmodel";
import Schedule from "../models/schedulemodel";
const Sequelize = require("sequelize");
const moment = require("moment");
const Op = Sequelize.Op;

// Return the announcement status based on the date_time start and end
const setStatus = (dateStart, dateEnd) => {
  // console.log("linke", moment(dateStart).format("YYYY MM DD"));

  // console.log(moment());
  const currentDate = new Date();
  // const start = new Date(dateStart);
  // const end = new Date(dateEnd);
  const start = moment(dateStart).format("YYYY MM DD");
  const end = moment(dateEnd).format("YYYY MM DD");
  if (start.isAfter(currentDate) && end.isSameOrAfter(currentDate)) {
    return "Scheduled";
  } else if (
    start.isSameOrBefore(currentDate) &&
    end.isSameOrAfter(currentDate)
  ) {
    return "Active";
  } else {
    return "Inactive";
  }

  // if (start > currentDate && end > currentDate) {
  //   return "Scheduled";
  // } else if (start <= currentDate && end >= currentDate) {
  //   return "Active";
  // } else {
  //   return "Inactive";
  // }
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
