import React from "react";
import { Grid, Header } from "semantic-ui-react";
import DateTime from "./PreviewDateTime";
import Weather from "./PreviewWeather";
import { callbackify } from "util";

const DisplayHeader = () => (
  <Grid.Row>
    <Grid.Column width={4}>
      <Weather weatherVW="1.2vw"/>
    </Grid.Column>
    <Grid.Column width={8}>
      <Header
        textAlign="center"
        as="h1"
        inverted
        style={{ fontSize: "calc(40px + .5vw)", fontWeight: "200" }}
      >
        Announcements
      </Header>
    </Grid.Column>
    <Grid.Column width={4}>
      <DateTime dateVW="1.2vw"/>
    </Grid.Column>
  </Grid.Row>
);

export default DisplayHeader;
