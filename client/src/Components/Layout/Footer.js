import React from "react";
import { Container, Image, List, Segment } from "semantic-ui-react";

const footerStyle =  {
  position: 'fixed',
  height: '5em',
  width: '100%',
  right: '0px',
  left: '0px',
  // padding: '1rem',
  // paddingTop: '3em',
  bottom: '0px',
  marginTop: '5em',
  // padding: "3em 0em",
  margin: "5em 0em 0em",
  marginBottom: '0px'

}
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
