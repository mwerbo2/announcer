const devInfo = {
  username: "michaelwerbowsky",
  password: "",
  host: "localhost"
}

const Sequelize = require('sequelize');
console.log('config.js')

const sequelize = new Sequelize({
  database: 'announcetwo',
  username: devInfo.username || 'user',
  password: devInfo.password || 'pass',
  dialect: 'postgres',
  host: devInfo.host || 'postgres'
});

export { sequelize };
