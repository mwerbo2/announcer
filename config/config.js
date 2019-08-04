// const devInfo = {
//   username: "michaelwerbowsky",
//   password: "",
//   host: "localhost"
// }
const Sequelize = require("sequelize");

// const sequelize = new Sequelize({
//   database: "announcetwo",
//   username: "user",
//   password: "pass",
//   dialect: "postgres",
//   host: "postgres"
// });

const sequelize = new Sequelize({
  database: "announcetwo",
  username: "michaelwerbowsky",
  password: "",
  dialect: "postgres",
  host: "localhost"
});

// const sequelize = new Sequelize({
//   database: 'announcetwo',
//   username: devInfo.username || 'user',
//   password: devInfo.password || 'pass',
//   dialect: 'postgres',
//   host: devInfo.host || 'postgres'
// });

export { sequelize };
