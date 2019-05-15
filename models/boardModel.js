import { sequelize } from '../config/config';
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Board extends Model {}
Board.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: Sequelize.STRING
  },
  background_color: {
    type: Sequelize.STRING
  },
  background_image: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  // options
});

export default Board;