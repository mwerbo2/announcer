import { sequelize } from '../config/config';
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Announcement extends Model {}
Announcement.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  user_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  announcement_title: {
    type: Sequelize.STRING
  },
  announcement_body: {
    type: Sequelize.STRING(1234)
  },
  status: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  // options
});

export default Announcement;