import React from "react";
import { Header, Button, Grid, Segment } from "semantic-ui-react";
import { Link, Router, withRouter } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import history from '../../Auth/history'

class WelcomeMain extends React.Component {
  render() {
    return (
      <Segment className="MainStyle" style={{ marginTop: "3em" }}>
        <Navbar />
        <Grid
          textAlign="center"
          style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
        >
          <Grid.Row verticalAlign="middle" textAlign="center">
            <Grid.Column width={16}>
              <Header style={{ fontSize: "3rem", padding: "0em 0em 1em" }}>
                Make announcements faster.
              </Header>
              <Header as="h1">Get started here</Header>
              <Button size="massive">
                <Link to={"/displayeditor"}>Add Announcement</Link>
              </Button>
              <Header as="h1">Already have a post?</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width="4" textAlign="center">
              <Button size="massive">
                <Link to={`/display`} target="_blank">
                  View Live Post
                </Link>
              </Button>
            </Grid.Column>
            <Grid.Column width="4" textAlign="center">
              <Button size="massive">
                <Link to={"/profile"}>Edit Post</Link>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Footer />
      </Segment>
    );
  }
}

export default withRouter(WelcomeMain);
