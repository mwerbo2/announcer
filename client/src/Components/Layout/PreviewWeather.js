import React from "react";
import { Container, Header } from "semantic-ui-react";
import axios from "axios";

class Weather extends React.Component {
  state = {
    currentWeather: "",
    conditions: "fair",
    temp: "",
    temp_max: "",
    temp_min: ""
  };

  capitalizeString(str) {
    str = str.split(" ");
    for (var i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
  }

  componentDidMount() {
    axios
      .get("/weather/id")
      .then(res => {
        this.setState({
          currentWeather: res.data,
          conditions: this.capitalizeString(res.data.weather[0].description),
          temp: res.data.main.temp,
          temp_max: res.data.main.temp_max,
          temp_min: res.data.main.temp_min
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Container>
        <Header as="h2">{this.state.conditions}</Header>
        <Header as="h3">
          {Math.floor(this.state.temp_min)}&#176;{" "}
          {Math.floor(this.state.temp_max)}&#176;
        </Header>
      </Container>
    );
  }
}

export default Weather;
