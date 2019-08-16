import React from "react";
import { Grid, Header } from "semantic-ui-react";
import DateTime from "./PreviewDateTime";
import Weather from "./PreviewWeather";

const DisplayHeader = () => (
  <Grid.Row>
    <Grid.Column width={4}>
      <Weather weatherVW="2vw"/>
    </Grid.Column>
    <Grid.Column width={8}>
      <Header
        textAlign="center"
        as="h1"
        inverted
        style={{ fontSize: "3vw", fontWeight: "200" }}
      >
        Announcements
      </Header>
    </Grid.Column>
    <Grid.Column width={4}>
      <DateTime dateVW="2vw"/>
    </Grid.Column>
  </Grid.Row>
);

export default DisplayHeader;
