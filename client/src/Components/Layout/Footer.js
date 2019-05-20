import React from "react";
import { Container, Image, Segment } from "semantic-ui-react";

const Footer = () => {
  return (
    <Segment
      inverted
      vertical
      // style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
      // style={footerStyle}
    >
      <Container textAlign="center">
        <Image
          centered
          size="mini"
          src="/vector-megaphone-man-shouting-8.png"
        />
      </Container>
    </Segment>
  );
};

export default Footer;
