import React from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
// import WeatherIcon from 'react-icons-weather';
// import WeatherIcons from 'react-weathericons';
// import WeatherIcons from 'react-weathericons';
import "weather-icons/css/weather-icons.css";

class Weather extends React.Component {
  state = {
    currentWeather: "",
    conditions: "fair",
    temp: "",
    temp_max: "",
    temp_min: "",
    iconName: "",
    iconImage: ""
  };

  darkSkyIcons = [
    "clear-day",
    "clear-night",
    "rain",
    "snow",
    "sleet",
    "wind",
    "fog",
    "cloudy",
    "partly-cloudy-day",
    "partly-cloudy-night"
  ];

  iconSelector = () => {
    switch (this.state.icon) {
      case "clear-day":
        this.setState({ iconImage: "wi-day-sunny" });
        break;
      case "clear-night":
        this.setState({ iconImage: "wi-night-clear" });
        break;
      case "rain":
        this.setState({ iconImage: "wi-rain" });
        break;
      case "snow":
        this.setState({ iconImage: "wi-snow" });
        break;
      case "sleet":
        this.setState({ iconImage: "wi-sleet" });
        break;
      case "wind":
        this.setState({ iconImage: "wi-strong-wind" });
        break;
      case "fog":
        this.setState({ iconImage: "wi-fog" });
        break;
      case "cloudy":
        this.setState({ iconImage: "wi-cloudy" });
        break;
      case "partly-cloudy-day":
        this.setState({ iconImage: "wi-day-cloudy" });
        break;
      case "partly-cloudy-night":
        this.setState({ iconImage: "wi-night-partly-cloudy" });
        break;
      default:
        this.setState({ iconImage: "wi-day-cloudy" });
    }
  };

  componentDidMount() {
    axios
      .get("/weather")
      .then(res => {
        this.setState({
          temp: res.data.temperature,
          icon: res.data.icon
        });
        this.iconSelector();
      })
      .catch(err => {
        console.log(err);
      });

    this.timeInterval = setInterval(() => {
      axios
        .get("/weather")
        .then(res => {
          this.setState({
            temp: res.data.temperature,
            icon: res.data.icon
          });
          this.iconSelector();
        })
        .catch(err => {
          console.log(err);
        });
    }, 1000 * 60 * 60);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  render() {
    return (
      <Container textAlign="center" style={{ marginTop: ".5em" }}>
        <span style={{ fontSize: `calc(17px + ${this.props.weatherVW})`, color: "white" }}>
          <i className={`wi ${this.state.iconImage}`} />
        </span>
        <p style={{ color: "white", fontSize: `calc(15px + ${this.props.weatherVW})` }}>
          {Math.round(this.state.temp)}&deg;F
        </p>
      </Container>
    );
  }
}

export default Weather;
