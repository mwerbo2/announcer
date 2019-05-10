require('dotenv').config();

const Sequelize = require('sequelize');
console.log('config.js')

const sequelize = new Sequelize({
  database: 'announcetwo',
  username: 'user',
  // username: process.env.psqlUSER || 'user',
  password: 'pass',
  // password: process.env.psqlPASSWORD || 'pass',
  dialect: 'postgres',
  host: 'postgres'
});

export { sequelize };
