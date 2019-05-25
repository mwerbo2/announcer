import React from "react";
import {
  Container,
  Grid} from "semantic-ui-react";

const liveContainerStyle = {
  color: '#ffffff',
  opacity: '.9',
  background: 'rgba(0, 0, 0, 0.2)'
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
