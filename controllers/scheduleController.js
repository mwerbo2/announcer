import Schedule from "../models/schedulemodel";
import Announcement from "../models/announcementmodel";
import { setStatus } from "./statusUpdateController";

const createSchedule = async (req, res) => {
  console.log(req.body)
  const startDateFormatted = new Date(req.body.date_time_start)
  const endDateFormatted = new Date(req.body.date_time_end)
  const stat = setStatus(startDateFormatted, endDateFormatted);
  try {
    const schedule = await Schedule.create({
      date_time_start: startDateFormatted,
      date_time_end: endDateFormatted,
      AnnouncementId: req.body.AnnouncementId
    });

    const statusUpdate = await Announcement.update(
      {
        status: stat
      },
      {
        where: {
          id: req.body.AnnouncementId
        }
      }
    );

    return res.status(201).send(schedule);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getAllScheduled = async (req, res) => {
  try {
    const schedule = await Schedule.findAll({});
    return res.status(200).send(schedule);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findAll({
      where: {
        AnnouncementId: req.params.id
      }
    });
    return res.status(200).send(schedule);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const updateSchedule = async (req, res) => {
  const startDateFormatted = new Date(req.body.date_time_start)
  const endDateFormatted = new Date(req.body.date_time_end)
  try {
    const schedule = await Schedule.update(
      {
        date_time_start: startDateFormatted,
        date_time_end: endDateFormatted
      },
      {
        where: {
          AnnouncementId: req.params.id
        }
      }
    );

    const stat = await setStatus(
      startDateFormatted,
      endDateFormatted
    );
    const statusUpdate = await Announcement.update(
      {
        status: stat
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    console.log(schedule);
    return res.status(200).send(schedule);
  } catch (error) {
    return res.status(400).send(error);
  }
};
 
export { createSchedule, getAllScheduled, getScheduleById, updateSchedule };
