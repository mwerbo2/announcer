import Schedule from "../models/schedulemodel";
import Announcement from "../models/announcementmodel";
import { setStatus } from "./statusUpdateController";
import { read } from "fs";

const createSchedule = async (req, res) => {
  const stat = setStatus(req.body.date_time_start, req.body.date_time_end);
  console.log("sc.js line 7 ", stat);
  console.log("***********controller start", req.body.date_time_start);
  console.log("***********controller end", req.body.date_time_end);
  try {
    const schedule = await Schedule.create({
      date_time_start: req.body.date_time_start,
      date_time_end: req.body.date_time_end,
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
  try {
    const schedule = await Schedule.update(
      {
        date_time_start: req.body.date_time_start,
        date_time_end: req.body.date_time_end
      },
      {
        where: {
          AnnouncementId: req.params.id
        }
      }
    );

    const stat = await setStatus(
      req.body.date_time_start,
      req.body.date_time_end
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
