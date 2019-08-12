import Announcement from "../models/announcementmodel";
import Schedule from "../models/schedulemodel";
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
            id: updateId,
            status: {
              [Op.not]: "archive"
            }
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
            id: updateId,
            status: {
              [Op.not]: "archive"
            }
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
            id: updateId,
            status: {
              [Op.not]: "archive"
            }
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export { setStatus, updateStatus };
