import axios from 'axios'

const getWeather = async (req, res) => {
    console.log('dc.js')
    try {
        const weather = await axios.get(`https://api.darksky.net/forecast/${process.env.darkSkyApi}/41.997190,-87.654890`);
        return res.status(200).send(weather.data.currently);
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    };
};

export{ getWeather };
