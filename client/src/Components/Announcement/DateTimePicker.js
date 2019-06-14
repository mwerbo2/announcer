import React from "react";
import PropTypes from "prop-types";
import { Button, Header, Icon, Grid } from "semantic-ui-react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import auth0Client from "../../Auth/Auth";
import DatePicker from "react-datepicker";
import RepeatDropdown from "./RepeatDropdown";
import "react-datepicker/dist/react-datepicker.css";

const styles = theme => ({
  flexcontainer: {
    display: "flex",
    flexDirection: "row"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class DateAndTimePickers extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartTime = this.handleStartTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);

    this.state = {
      startTime: new Date(),
      endTime: new Date(),
      currentSchedule: [],
      postMessage: "",
      scheduleDeleted: false
    };
  }
  closeModal(res) {
    this.setState({ postMessage: res.statusText });
    this.props.closeMod();
  }
  componentDidMount() {
    axios
      .get(`/schedules/${this.props.post_id}`)
      .catch(error => console.log(error))
      .then(res => this.setState({ currentSchedule: res.data }));
  }

  handleChange = date => {
    this.setState({
      startTime: date
    });
  };

  deleteSchedule = () => {
    axios
      .delete(`/announcements/${this.props.post_id}`)
      .catch(error => console.log(error))
      .then(() => this.setState({ scheduleDeleted: true }));
  };

  checkSchedule = () => {};

  handleSubmit = e => {
    this.checkSchedule();
    e.preventDefault();
    const p_id = this.props.post_id;
    if (this.state.currentSchedule.length > 0) {
      axios
        .put(
          `/schedules/${p_id}`,
          {
            date_time_start: this.state.startTime,
            date_time_end: this.state.endTime
          },
          {
            headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
          }
        )
        .then(res => this.closeModal(res))
        .catch(err => console.log(err));
    } else {
      axios
        .post(
          "/schedules",
          {
            date_time_start: this.state.startTime,
            date_time_end: this.state.endTime,
            AnnouncementId: p_id
          },
          {
            headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
          }
        )
        .then(res => this.closeModal(res))
        .catch(err => console.log(err));
    }
  };

  handleStartTime = e => {
    this.setState({ startTime: e.target.value });
  };
  handleStartDate = date => {
    this.setState({ startTime: date });
  };
  handleEndDate = date => {
    this.setState({ endTime: date });
  };

  handleEndTime = e => {
    this.setState({ endTime: e.target.value });
  };

  render() {
    if (this.state.currentSchedule.length === 0) {
      return (
        <div>
          <div className={this.props.classes.flexcontainer}>
            <form
              className={this.props.container}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <Grid centered textAlign="center" columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h5">Date Start</Header>
                    <DatePicker
                      selected={this.state.startTime}
                      onChange={this.handleStartDate}
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                      key={1}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h5">Date End</Header>
                    <DatePicker
                      selected={this.state.endTime}
                      onChange={this.handleEndDate}
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date()}
                      key={2}
                    />
                  </Grid.Column>

                  <Grid.Column>
                    <Button
                      type="submit"
                      positive
                      style={{ position: "absolute", right: 0, bottom: 0 }}
                    >
                      Save
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </form>
            <Header as="h3">{this.state.postMessage}</Header>
          </div>
          <Header as="h2">
            <Icon name="calendar" />
            <Header.Content>No Schedules</Header.Content>
          </Header>
        </div>
      );
    } else {
      return (
        <div>
          <div className={this.props.classes.flexcontainer}>
            <form
              className={this.props.container}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <Grid centered textAlign="center" columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h5">Date Start</Header>
                    <DatePicker
                      selected={this.state.startTime}
                      onChange={this.handleStartDate}
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h5">Date End</Header>
                    <DatePicker
                      selected={this.state.endTime}
                      onChange={this.handleEndDate}
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date()}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Button type="submit" positive>
                      Save
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </form>
            <Header as="h3">{this.state.postMessage}</Header>
          </div>
          <Header as="h3">
            {" "}
            <Icon name="calendar check outline" />
            Current schedule
          </Header>
          {this.state.currentSchedule.map(schedule => {
            return (
              <Grid columns={2} key={schedule.id}>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Header as="h4">Date start</Header>
                    <Header as="h4">{schedule.date_time_start}</Header>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Header as="h4"> Date end</Header>
                    <Header as="h4">{schedule.date_time_end}</Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            );
          })}
        </div>
      );
    }
  }
}

DateAndTimePickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DateAndTimePickers);
