import Announcement from "../models/announcementmodel";
import Schedule from "../models/schedulemodel";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const createAnnouncement = async (req, res) => {
  try {
    const post = await Announcement.create({
      user_id: req.user.user_id,
      announcement_title: req.body.announcement_title,
      announcement_body: req.body.announcement_body,
      status: req.body.status
    });
    return res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllAnnouncements = async (req, res) => {
  try {
    const post = await Announcement.findAll({});
    return res.status(200).send(post);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getLiveAnnouncements = async (req, res) => {
  const currentDate = new Date();
  const beginningOfDay = currentDate.setHours(0, 0, 0, 0);
  const endOfDay = currentDate.setHours(23, 59, 59, 59);
  try {
    const post = await Announcement.findAll({
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
    return res.status(200).send(post);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getLiveAnnouncementWithStatus = async (req, res) => {
  const currentDate = new Date();
  const beginningOfDay = currentDate.setHours(0, 0, 0, 0);
  const endOfDay = currentDate.setHours(23, 59, 59, 59);
  try {
    const post = await Announcement.findAll({
      where: {
        status: 'active'
      },
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
    return res.status(200).send(post);
  } catch (error) {
    return res.status(400).send(error);
  }
};


const updateOrCreateAnnouncement = async (req, res) => {
  console.log(req.user);
  try {
    const post = await Announcement.upsert({
      id: req.body.announcementId,
      user_id: req.body.user_id,
      announcement_title: req.body.announcement_title,
      announcement_body: req.body.announcement_body,
      status: req.body.status
    }, {returning:true});
    return res.status(201).send(post);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const setAnnouncementStatus = async (req, res) => {
  try {
    const post = await Announcement.update(
      {
        status: req.body.status
      },
      { where: { id: req.body.id } }
    );
    return res.status(201).send(post);
  } catch (error) {
    return res.status(401).send(error);
  }
};



export {
  createAnnouncement,
  getAllAnnouncements,
  getLiveAnnouncements,
  updateOrCreateAnnouncement,
  setAnnouncementStatus,
  getLiveAnnouncementWithStatus
};
