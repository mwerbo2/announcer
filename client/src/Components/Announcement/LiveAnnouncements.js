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

const LiveAnnouncement = props => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Container>
            <div
              name="title"
              className="title"
              dangerouslySetInnerHTML={{ __html: props.title }}
            />
            <div
              name="body"
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
