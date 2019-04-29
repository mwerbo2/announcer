import React from "react";
import { Container, Menu, Image } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import auth0Client from "../../Auth/Auth";
import { checkPropTypes } from "prop-types";

const Navbar = props => {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace("/");
  };

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item position="left" as={Link} to="/" header>
          <Image
            size="mini"
            src="/vector-megaphone-man-shouting-8.png"
            style={{ marginRight: "1.5em" }}
          />
          Announce
        </Menu.Item>
        <Menu.Item as={Link} to="/display" target="_blank">
        View Live
        </Menu.Item>
        <Menu.Item as={Link} to="/profile">
          Profile
        </Menu.Item>
        {!auth0Client.isAuthenticated() && (
          <Menu.Item onClick={auth0Client.signIn}>Log in</Menu.Item>
        )}
        {auth0Client.isAuthenticated() && (
          <Menu.Item as="a" onClick={signOut}>
            Log out
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default withRouter(Navbar);
