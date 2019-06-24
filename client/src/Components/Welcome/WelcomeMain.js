import React from "react";
import { Header, Button, Grid, Segment } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import auth0Client from "../../Auth/Auth";

class WelcomeMain extends React.Component {
  render() {
    return (
      <div>
        <Segment
          className="MainStyle"
          style={{ marginTop: "3em", minHeight: "100vh", flex: 1 }}
        >
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
                {!auth0Client.isAuthenticated() && (
                  <Button
                    color="blue"
                    size="massive"
                    onClick={auth0Client.signIn}
                  >
                    Add announcement
                  </Button>
                )}
                {auth0Client.isAuthenticated() && (
                  <Button color="blue" size="massive">
                    <Link to={"/displayeditor"} style={{ color: "white" }}>
                      Add announcement
                    </Link>
                  </Button>
                )}
                <Header as="h1">Already have a post?</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column width="4" textAlign="center">
                <Button color="blue" size="massive">
                  <Link
                    to={`/display`}
                    target="_blank"
                    style={{ color: "white" }}
                  >
                    View live post
                  </Link>
                </Button>
              </Grid.Column>
              <Grid.Column width="4" textAlign="center">
                {!auth0Client.isAuthenticated() && (
                  <Button
                    color="blue"
                    size="massive"
                    onClick={auth0Client.signIn}
                  >
                    View previous posts
                  </Button>
                )}
                {auth0Client.isAuthenticated() && (
                  <Button color="blue" size="massive">
                    <Link to={"/profile"} style={{ color: "white" }}>
                      View previous posts
                    </Link>
                  </Button>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Footer />
      </div>
    );
  }
}

export default withRouter(WelcomeMain);
