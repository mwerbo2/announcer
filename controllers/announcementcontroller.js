import Announcement from "../models/announcementmodel";
import Schedule from "../models/schedulemodel";
import {setStatus} from './statusUpdateController';

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const createAnnouncement = async (req, res) => {
  try {
    const post = await Announcement.create({
      user_id: req.body.user_id,
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
        status: "active"
      },
      include: [
        {
          model: Schedule,
          where: [
            {
              date_time_start: {
                [Op.lt]: endOfDay,
                [Op.gt]: beginningOfDay
              }
            },
            {
              date_time_end: {
                [Op.lt]: endOfDay,
                [Op.gt]: beginningOfDay
              }
            }
          ]
        }
      ]
    }); 
    return res.status(200).send(post);
  } catch (error) {
    return res.status(400).send(error);
  }
};
// Posting for new modal combined content and scheduling
const postAndSchedule = async (req, res) => {
const startDateFormatted = new Date(req.body.date_time_start)
const endDateFormatted = new Date(req.body.date_time_end)
  try {
    const post = await Announcement.create({
      user_id: req.body.user_id,
      announcement_title: req.body.announcement_title,
      announcement_body: req.body.announcement_body
    });
    
    const schedule = await Schedule.create({
      date_time_start: startDateFormatted,
      date_time_end: endDateFormatted,
      AnnouncementId: post.id
    });
    const stat = setStatus(startDateFormatted, endDateFormatted);
    const statusUpdate = await Announcement.update(
      {
        status: stat
      },
      {
        where: {
          id: post.id
        }
      }
    );
    return res.status(200).send(post)
  } catch (err) {
    return res.status(500).send(err)
  }
}
// Old method that to return active announcement by comparing status and dates
// const getLiveAnnouncementsRonak = async (req, res) => {
//   const currentDate = new Date();
//   try {
//     const post = await Announcement.findAll({
//       where: {
//         status: "active"
//       },
//       include: [
//         {
//           model: Schedule,
//           where: [
//             {
//               date_time_start: {
//                 [Op.lte]: currentDate
//               }
//             },
//             {
//               date_time_end: {
//                 [Op.gte]: currentDate
//               }
//             }
//           ]
//         }
//       ]
//     });
//     return res.status(200).send(post);
//   } catch (error) {
//     return res.status(400).send(error);
//   }
// };

const getLiveAnnouncementsRonak = async (req, res) => {
  try {
    const post = await Announcement.findAll({
      where: {
        status: "active"
      }
    });
    return res.status(200).send(post);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getAnnouncementByStatus = async (req, res) => {
  try {
    const activePosts = await Announcement.findAll({
      where: {
        status: "active"
      },
      include: [{ model: Schedule }]
    });

    const inactivePosts = await Announcement.findAll({
      where: {
        status: "inactive"
      },
      include: [{ model: Schedule }]
    });
    const scheduledPosts = await Announcement.findAll({
      where: {
        status: "scheduled"
      },
      include: [{ model: Schedule }]
    });

    return res.status(200).send({
      active: activePosts,
      inactive: inactivePosts,
      scheduled: scheduledPosts
    });
  } catch (err) {
    console.error(err.message);
  }
};
const updateAnnoucement = async (req, res) => {
  const {announcement_body, announcement_title, status} = req.body;
  const updateObject = {};
  if (announcement_body) updateObject.announcement_body = announcement_body;
  if (announcement_title) updateObject.announcement_title = announcement_title;
  if (status) updateObject.status = status;
  try {
    const post = await Announcement.update(
      {
        announcement_body: req.body.announcement_body,
        announcement_title: req.body.announcement_title,
        status: req.body.status
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    return res.status(200).send(post);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const updateOrCreateAnnouncement = async (req, res) => {
  try {
    const post = await Announcement.upsert(
      {
        id: req.body.announcementId,
        user_id: req.body.user_id,
        announcement_title: req.body.announcement_title,
        announcement_body: req.body.announcement_body,
        status: req.body.status
      },
      { returning: true }
    );
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
  updateAnnoucement,
  updateOrCreateAnnouncement,
  setAnnouncementStatus,
  getLiveAnnouncementWithStatus,
  getLiveAnnouncementsRonak,
  getAnnouncementByStatus,
  postAndSchedule
};
