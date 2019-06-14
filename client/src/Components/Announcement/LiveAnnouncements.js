import React from "react";
import { Container, Grid } from "semantic-ui-react";
import "./LiveAnnouncement.css";
import Media from "react";

const liveContainerStyle = {
  color: "#ffffff"
  // opacity: ".9",
  // background: "rgba(0, 0, 0, 0.2)"
};

// const titleDiv = {
//   fontSize: "100px",
//   backGround: grey,
//   color: "#ffffff"
// };

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
