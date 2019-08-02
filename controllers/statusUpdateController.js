import Announcement from "../models/announcementmodel";
import Schedule from "../models/schedulemodel";
import { json } from "body-parser";
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
  console.log("suc.js datestart", dateStart);
  console.log("suc.js dateend", dateEnd);
  console.log("suc.js 16", currentDate);
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
  const currentDate = moment().format("YYYY-MM-DD");
  console.log("suc.js 25 update status");

  // Check all announcements schedules for date start / end range
  // Update the announcement status accordingly

  // Return all scheduled announcements
  // SELECT id FROM "Schedules" WHERE "date_time_start" > '2019-07-29' AND "date_time_end" > '2019-07-29';

  // Return all active announcements
  // SELECT * FROM "Schedules" WHERE "date_time_start" <= '2019-07-29' AND "date_time_end" >= '2019-07-29';

  const scheduled = await Schedule.findAll({
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

  console.log("suc.js 48", scheduled);
  // find records and then update the corresponding files.

  // Correctly updates status with schedule table joined
  // UPDATE "Announcements" SET "status" = 'active' FROM "Schedules" WHERE "Announcements"."id"  = "Schedules"."AnnouncementId" AND "date_time_start" > "2019-07-30";

  try {
    // const allScheduled = await Schedule.findAll({
    //   where: {
    //     date_time_start: {
    //       [Op.gt]: currentDate
    //     },
    //     date_time_end: {
    //       [Op.gt]: currentDate
    //     }
    //   }
    // });
    // console.log("Find All:", allScheduled);
    // const scheduled = await Announcement.update(
    //   {
    //     status: "schedule"
    //   },
    //   {
    //     where: {
    //       "Schedule.date_time_start": {
    //         [Op.gt]: currentDate
    //       },
    //       "Schedule.date_time_end": {
    //         [Op.gt]: currentDate
    //       }
    //     }
    //   },
    //   {
    //     include: [
    //       {
    //         model: Schedule
    //       }
    //     ]
    //   }
    // );
    // console.log("Rescheduled", scheduled);
    // const active = await Announcement.update(
    //   {
    //     status: "active"
    //   },
    //   {
    //     include: [
    //       {
    //         model: Schedule,
    //         where: {
    //           date_time_start: {
    //             [Op.lte]: currentDate
    //           },
    //           date_time_end: {
    //             [Op.gte]: currentDate
    //           }
    //         }
    //       }
    //     ]
    //   }
    // );
    // const inactive = await Announcement.update(
    //   {
    //     status: "inactive"
    //   },
    //   {
    //     include: [
    //       {
    //         model: Schedule,
    //         where: {
    //           date_time_start: {
    //             [Op.lt]: currentDate
    //           },
    //           date_time_end: {
    //             [Op.lt]: currentDate
    //           }
    //         }
    //       }
    //     ]
    //   }
    // );
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
