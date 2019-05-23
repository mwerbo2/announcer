import React from "react";
import { Container } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import auth0Client from "../../Auth/Auth";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import AnnouncementBoard from "./AnnouncementBoard";
import EditorBarContainer from "../EditorBar/EditorBarContainer";

class Display extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullAnnouncement: [],
      title: "true",
      body: "true",
      content: "",
      live: true,
      add: false,
      backgroundColor: "",
      backgroundImage: ""
    };
  }
  componentDidMount() {
    // console.log(ReactDOM.findDOMNode().getBoundingClientRect())
  }

  getBackground = updated => {
    this.setState({
      backgroundImage: updated.backgroundImage
    });
    this.props.didBackgroundUpdate(updated);
  };

  render() {
    if (!auth0Client.isAuthenticated()) {
      return (
        <div>
          <Container
            key={this.props.key}
            style={{
              minHeight: "100%",
              height: "100%",
              padding: "3em 0em 0em",
              backgroundColor: "white",
              marginTop: "5em",
              flex: 1
            }}
          >
            <Navbar />
            <AnnouncementBoard
              backgroundColor={this.state.backgroundColor}
              backgroundImage={this.state.backgroundImage}
            />
          </Container>
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <Container
            key={this.props.key}
            style={{
              minHeight: "100vh",
              padding: "3em 0em 0em",
              backgroundColor: "white",
              marginTop: "5em",
              marginBottom: "5em",
              flex: 1
            }}
          >
            <Navbar />
            <EditorBarContainer didBackgroundUpdate={this.getBackground} />
            <AnnouncementBoard
              backgroundColor={this.state.backgroundColor}
              backgroundImage={this.state.backgroundImage}
            />
          </Container>
          <Footer />
        </div>
      );
    }
  }
}

export default withRouter(Display);
