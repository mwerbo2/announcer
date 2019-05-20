import { getWeather } from '../controllers/darkskyController'
module.exports = app => {
  app.get("/weather", getWeather);
  // app.get("/weather/lat", getWeatherLatLong);
  // app.get("/weather/city", getWeatherCityName);
  // app.get("/weather/zip", getWeatherZip);
  // app.get("/weather/id", getWeatherId);
};
