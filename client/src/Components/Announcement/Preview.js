import React from "react";
import { Segment, Grid } from "semantic-ui-react";
import Announcement from "./PreviewAnnouncements";
import DateTime from "./PreviewDateTime";
import Weather from "./PreviewWeather";

//Used within the main editor to show a live preview of the announcement being edited
class Preview extends React.Component {
  render() {
    return (
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <DateTime />
            </Grid.Column>
            <Grid.Column width={4} />
            <Grid.Column width={6}>
              <Weather />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Announcement title={this.props.title} body={this.props.body} />
      </Segment>
    );
  }
}

export default Preview;
