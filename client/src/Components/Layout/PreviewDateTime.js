import React from "react";
import { Container } from "semantic-ui-react";
import moment from "moment";

class DateTime extends React.Component {
  state = {
    date: moment().format("MMMM D, YYYY"),
    time: moment().format("h:mm A")
  };

  componentDidMount() {
    setInterval(() => {
      this.timeInterval();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  timeInterval = () => {
    this.setState({
      date: moment().format("MMMM D, YYYY"),
      time: moment().format("h:mm A")
    });
  };

  render() {
    return (
      <Container>
        <p
          style={{
            color: "white",
            fontSize: `calc(15px + ${this.props.dateVW})`,
            margin: "0",
            textAlign: "center"
          }}
        >
          {this.state.date}
        </p>
        <p style={{ color: "white", fontSize: `calc(15px + ${this.props.dateVW})`, textAlign: "center" }}>
          {this.state.time}
        </p>
      </Container>
    );
  }
}

export default DateTime;
