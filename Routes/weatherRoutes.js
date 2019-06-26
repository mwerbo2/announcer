import { getWeather } from "../controllers/darkskyController";
module.exports = app => {
  app.get("/weather", getWeather);
};
