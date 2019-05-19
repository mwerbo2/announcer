import React from "react";
import PropTypes from "prop-types";
import { Button, List, Header, Icon, Message, Grid } from "semantic-ui-react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import moment from "moment";
import auth0Client from "../../Auth/Auth";
import DatePicker from "react-datepicker";
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
    const { classes } = props;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartTime = this.handleStartTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);

    this.state = {
      // defaultDate: new Date('2019-03-27T10:30'),
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
    console.log(this.state.postMessage);
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
    console.log(this.state.startTime);
  };

  deleteSchedule = () => {
    axios
      .delete(`/announcements/${this.props.post_id}`)
      .catch(error => console.log(error))
      .then(res => this.setState({ scheduleDeleted: true }));
  };

  checkSchedule = () => {
    this.state.currentSchedule ? console.log("a") : console.log("meow");
  };

  handleSubmit = e => {
    this.checkSchedule();
    console.log("dt.js ", this.props.post_id);
    // console.log("line 49", this.props.post_id.props.post_id);
    e.preventDefault();
    const p_id = this.props.post_id;
    const start = new Date(this.state.startTime);
    const end = new Date(this.state.endTime);
    // console.log("pid", p_id);
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
    console.log("dtp.js 117", this.currentIsoDate);
    const today = new Date();
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

              {/* <TextField
                id="date"
                label="Day to start"
                type="date"
                min='2019-05-17'
                defaultValue={this.state.startTime}
                className={this.props.classes.textField}
                onChange={this.handleStartTime}
                InputLabelProps={{
                  shrink: true
                }}
              /> */}
              {/* <TextField
                id="date"
                label="Day to end"
                type="date"
                min={today}
                defaultValue={this.state.endTime}
                className={this.props.classes.textField}
                onChange={this.handleEndTime}
                InputLabelProps={{
                  shrink: true
                }}
              /> */}
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
              <Grid columns={2}>
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
              // {schedule}
              // schedule.date_time_start ? <h1>Date Start</h1> : <h1>Date End</h1>
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
