import React from "react";
import { Grid, Header } from "semantic-ui-react";
import DateTime from "./PreviewDateTime";
import Weather from "./PreviewWeather";

const DisplayHeader = () => (
  <Grid.Row>
    <Grid.Column width={4}>
      <Weather />
    </Grid.Column>
    <Grid.Column width={8}>
      <Header textAlign="center" as="h1">
        Announcements
      </Header>
    </Grid.Column>
    <Grid.Column width={4}>
      <DateTime />
    </Grid.Column>
  </Grid.Row>
);

export default DisplayHeader;
