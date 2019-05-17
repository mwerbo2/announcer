import React from "react";
import PropTypes from "prop-types";
import { Button, List, Header, Icon, Message } from "semantic-ui-react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import moment from 'moment'
import auth0Client from "../../Auth/Auth";

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
      startTime: moment().format("YYYY-MM-DDTHH:mm:ss"),
      endTime: moment().format("YYYY-MM-DDTHH:mm:ss"),
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

  deleteSchedule = () => {
    axios
      .delete(`/announcements/${this.props.post_id}`)
      .catch(error => console.log(error))
      .then(res => this.setState({ scheduleDeleted: true }));
  };

  checkSchedule = () => {
    this.state.currentSchedule ? console.log('a') : console.log('meow')
  }

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
      axios.put(`/schedules/${p_id}`,
      {
        date_time_start: start,
        date_time_end: end,
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
          date_time_start: start,
          date_time_end: end,
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

  handleEndTime = e => {
    this.setState({ endTime: e.target.value });
  };

  render() {
    console.log("dtp.js 117", this.currentIsoDate)
    if (this.state.currentSchedule.length === 0) {
      return (
        <div>
          <div className={this.props.classes.flexcontainer}>
            <form
              className={this.props.container}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <TextField
                id="datetime-local"
                label="Day / time to start"
                type="datetime-local"
                defaultValue={moment().format("YYYY-MM-DDTHH:mm:ss")}
                className={this.props.classes.textField}
                onChange={this.handleStartTime}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                id="datetime-local"
                label="Day / time to end"
                type="datetime-local"
                defaultValue={moment().format("YYYY-MM-DDTHH:mm:ss")}
                className={this.props.classes.textField}
                onChange={this.handleEndTime}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <Button type="submit" positive>
                Save
              </Button>
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
              <TextField
                id="datetime-local"
                label="Day / time to start"
                type="datetime-local"
                defaultValue={this.state.startTime}
                className={this.props.classes.textField}
                onChange={this.handleStartTime}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                id="datetime-local"
                label="Day / time to end"
                type="datetime-local"
                defaultValue={this.state.endTime}
                className={this.props.classes.textField}
                onChange={this.handleEndTime}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <Button type="submit" positive>
                Save
              </Button>
            </form>
            <Header as="h3">{this.state.postMessage}</Header>
          </div>
          <Header as="h2">Current Schedule</Header>
          {this.state.currentSchedule.map(schedule => {
            return (
              <Header as="h3">
                <Icon name="calendar" />
                <Header.Content>
                  {schedule.date_time_start} {schedule.date_time_end}
                </Header.Content>{" "}
                <Icon
                  name="trash alternate"
                  size="large"
                  onClick={this.deleteSchedule}
                />
              </Header>
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
