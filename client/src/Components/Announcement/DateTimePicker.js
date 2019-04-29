import React from "react";
import PropTypes from "prop-types";
import { Button, List, Header, Icon, Message} from 'semantic-ui-react';
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
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
      startTime: "date",
      endTime: "date",
      currentSchedule: [],
      postMessage: ""
    };
  }
  closeModal(res) {
    this.setState({ postMessage: res.statusText})
    this.props.closeMod();
    console.log(this.state.postMessage);
    
  }
  componentDidMount() {
    console.log("mount: ", this.props.post_id)
    axios.get(`/schedules/${this.props.post_id}`)
    .catch(error => console.log(error))
    .then(res => this.setState({currentSchedule: res.data}))
  }

  handleSubmit = e => { 
    console.log("dt.js ", this.props.post_id)   
    // console.log("line 49", this.props.post_id.props.post_id); 
    e.preventDefault();
    const p_id = this.props.post_id;
    const start = new Date(this.state.startTime);
    const end = new Date(this.state.endTime);
    // console.log("pid", p_id);

    axios.post("/schedules",
        {
          date_time_start: start,
          date_time_end: end,
          AnnouncementId: p_id
        },
        {
          headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
        }
      )
      .then((res) =>  this.closeModal(res))
      .catch(err => console.log(err));

    // axios.get(`/announcements/schedule/${p_id}`)
    // .then(res => console.log("line 66 dtp.js", res))
    // .catch(err => console.log(err))
  };

  handleStartTime = e => {
    this.setState({ startTime: e.target.value });
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
          <TextField
            id="datetime-local"
            label="Day / time to start"
            type="datetime-local"
            defaultValue="2019-03-27T10:30"
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
            defaultValue="2019-03-27T10:30"
            className={this.props.classes.textField}
            onChange={this.handleEndTime}
            InputLabelProps={{
              shrink: true
            }}
          />
          <Button type='submit' positive>Save</Button>
        </form>
        <Header as="h3">{this.state.postMessage}</Header>
        </div>
        <Header as='h2'>
        <Icon name='calendar' />
        <Header.Content>No Schedules</Header.Content>
      </Header>
      
      </div>
      )
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
            defaultValue="2019-03-27T10:30"
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
            defaultValue="2019-03-27T10:30"
            className={this.props.classes.textField}
            onChange={this.handleEndTime}
            InputLabelProps={{
              shrink: true
            }}
          />
          <Button type='submit' positive>Save</Button>
        </form>
        <Header as="h3">{this.state.postMessage}</Header>
      </div>
        <Header as="h2">Current Schedule</Header>
        {this.state.currentSchedule.map(schedule => {
          return (<Header as='h3'><Icon name='calendar' /><Header.Content>{schedule.date_time_start}   {schedule.date_time_end}</Header.Content></Header>)
        })}
        
      </div>
      )

    }

    
  }
}

DateAndTimePickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DateAndTimePickers);
