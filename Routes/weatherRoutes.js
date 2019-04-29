import { getWeatherLatLong, getWeatherCityName, getWeatherZip, getWeatherId } from "../controllers/weatherController";

module.exports = app => {
  app.get("/weather/lat", getWeatherLatLong);
  app.get("/weather/city", getWeatherCityName);
  app.get("/weather/zip", getWeatherZip);
  app.get("/weather/id", getWeatherId);
};
