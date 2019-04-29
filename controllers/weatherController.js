import axios from 'axios';

const getWeatherLatLong = (req, res) => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=41.85&lon=-87.652&units=imperial&appid=${process.env.weatherAPIKey}`)
    .then(weather => res.status(200).send(weather.data))
    .catch(error => res.status(500).send(error));
};

const getWeatherCityName = (req, res) => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Edgewater,us&units=imperial&appid=${process.env.weatherAPIKey}`)
    .then(weather => res.status(200).send(weather.data))
    .catch(error => res.status(500).send(error));
};

const getWeatherZip = (req, res) => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=60660,us&appid=${process.env.weatherAPIKey}`)
    .then(weather => res.status(200).send(weather.data))
    .catch(error => res.status(500).send(error));
};

const getWeatherId = (req, res) => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?id=4887398&appid=${process.env.weatherAPIKey}&units=imperial`)
    .then(weather => {res.status(200).send(weather.data)})
    .catch(error => res.status(500).send(error));
};

export {
    getWeatherLatLong,
    getWeatherCityName,
    getWeatherZip,
    getWeatherId
};