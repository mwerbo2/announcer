import React from "react";
import { Grid, Container, Header } from "semantic-ui-react";
import {withRouter} from 'react-router-dom'
import Weather from "./PreviewWeather";
import DateTime from "./PreviewDateTime";
// import Announcement from './Announcement/PreviewAnnouncements';
import LiveAnnouncement from "../Announcement/LiveAnnouncements";
import DisplayHeader from "./DisplayHeader";
import axios from "axios";

class Display extends React.Component {
  state = {
    fullAnnouncement: [],
    title: "",
    body: ""
  };

  componentDidMount() {
    axios
      .get("/announcements/liveStatus")
      .then(announcement => {
        this.setState({
          fullAnnouncement: announcement.data,
          title: announcement.title,
          body: announcement.body
        });
        console.log(this.state.fullAnnouncement);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Container key={this.props.key} style={{ padding: "3em 0em 0em" }}>
        <Grid>
          <DisplayHeader />
          <Grid.Row>
            <Grid.Column width={16}>
              {this.state.fullAnnouncement.map(announce => {
                console.log(announce);
                return (
                  <LiveAnnouncement
                    key={announce.id}
                    title={announce.announcement_title}
                    body={announce.announcement_body}
                  />
                );
              })}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(Display);
