require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'announcetwo',
  username: process.env.psqlUSER || 'root',
  password: process.env.psqlPASSWORD || 'test',
  dialect: 'postgres'
});

export { sequelize };
