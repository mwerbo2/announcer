import React from "react";
import {
  Container,
  Grid,
  Icon,
  Modal,
  Button,
  Image,
  Header
} from "semantic-ui-react";

const liveContainerStyle = { 
  // backgroundColor: "#000000",
  color: '#ffffff',
  opacity: '.9'
}
const LiveAnnouncement = props => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Container style={liveContainerStyle}>
            <div
              name="title"
              style={{color: '#ffffff'}}
              className="title"
              dangerouslySetInnerHTML={{ __html: props.title }}
            />
            <div
              name="body"
              style={{color: '#ffffff'}}
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
