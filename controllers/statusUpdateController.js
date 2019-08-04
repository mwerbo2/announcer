import Announcement from "../models/announcementmodel";
import Schedule from "../models/schedulemodel";
import { json } from "body-parser";
import { type } from "os";
const Sequelize = require("sequelize");
const moment = require("moment");
const Op = Sequelize.Op;

// Return the announcement status based on the date_time start and end
const setStatus = (dateStart, dateEnd) => {
  // const currentDate = moment().format("YYYY-MM-DD");
  const currentDate = moment()
    .tz("America/Chicago")
    .format("YYYY-MM-DD");
  // const currentDate = new Date().toLocaleDateString();
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
// Runs on crontab to update announcement statuses based on start and end dates in schedule
const updateStatus = async () => {
  try {
    const currentDate = moment()
      .tz("America/Chicago")
      .format("YYYY-MM-DD");
    // Scheduled
    const scheduled = await Schedule.findAll({
      raw: true,
      attributes: ["AnnouncementId"],
      where: {
        date_time_start: {
          [Op.gt]: currentDate
        },
        date_time_end: {
          [Op.gt]: currentDate
        }
      }
    });
    scheduled.map(sched => {
      const updateId = sched.AnnouncementId;
      Announcement.update(
        {
          status: "scheduled"
        },
        {
          where: {
            id: updateId
          }
        }
      );
    });

    // Active
    const active = await Schedule.findAll({
      raw: true,
      attributes: ["AnnouncementId"],
      where: {
        date_time_start: {
          [Op.lte]: currentDate
        },
        date_time_end: {
          [Op.gte]: currentDate
        }
      }
    });

    active.map(posts => {
      const updateId = posts.AnnouncementId;
      Announcement.update(
        {
          status: "active"
        },
        {
          where: {
            id: updateId
          }
        }
      );
    });

    // Inactive
    const inActive = await Schedule.findAll({
      raw: true,
      attributes: ["AnnouncementId"],
      where: {
        date_time_start: {
          [Op.lt]: currentDate
        },
        date_time_end: {
          [Op.lt]: currentDate
        }
      }
    });

    inActive.map(posts => {
      const updateId = posts.AnnouncementId;
      Announcement.update(
        {
          status: "inactive"
        },
        {
          where: {
            id: updateId
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
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

export { SetInactiveStatus, setStatus, updateStatus };
