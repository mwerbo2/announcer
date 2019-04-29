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
    type: Sequelize.STRING,
    allowNull: false
  },
  board_background: {
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