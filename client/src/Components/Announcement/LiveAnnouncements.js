import React from "react";
import { Container, Grid } from "semantic-ui-react";
import "./LiveAnnouncement.css";

const liveContainerStyle = {
  color: "#ffffff"
};

const LiveAnnouncement = props => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Container style={liveContainerStyle} fluid>
            <div
              name="title"
              className="title"
              dangerouslySetInnerHTML={{ __html: props.title }}
            />
            <div
              name="body"
              style={{ color: "#ffffff" }}
              className="body"
              dangerouslySetInnerHTML={{ __html: props.body }}
            />
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default LiveAnnouncement;
