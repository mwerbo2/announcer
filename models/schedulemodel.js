import { sequelize } from '../config/config';
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Schedule extends Model {}
Schedule.init({
  date_time_start: {
    type: Sequelize.DATE
  },
  date_time_end: {
    type: Sequelize.DATE
  },
  repeat_interval: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  // options
});

export default Schedule;