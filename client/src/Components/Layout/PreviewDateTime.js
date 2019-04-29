import React from "react";
import { Container, Header } from "semantic-ui-react";
import moment from "moment";

class DateTime extends React.Component {
  state = {
    dateTime: moment().format("LLLL")
  };

  componentDidMount() {
    this.timeInterval = setInterval(() => {
      this.setState({
        dateTime: moment().format("LLLL")
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  render() {
    return (
      <Container>
        <Header as="h2">{this.state.dateTime}</Header>
      </Container>
    );
  }
}

export default DateTime;
