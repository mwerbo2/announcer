import React from "react";
import { Grid, Container, Header, Message } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import axios from "axios";
// import { Editor } from '@tinymce/tinymce-react';
import Weather from "./PreviewWeather";
import DateTime from "./PreviewDateTime";
import Announcement from "../Announcement/Announcement";
import AddButton from "../Announcement/AddButton";
import AnnouncementPlaceholder from "../Announcement/AnnouncementPlaceholder";
import Announcements from "../Announcement/Announcements";
import DisplayHeader from "./DisplayHeader";
import auth0Client from "../../Auth/Auth";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import AnnouncementBoard from "./AnnouncementBoard";
import SidebarEditor from "./SidebarEditor";

const boardStyle = {
  height: "10",
  width: "px",
  margin: "40px 10px",
  backgroundColor: "#FF0000"
};
class Display extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullAnnouncement: [],
      title: "true",
      body: "true",
      content: "",
      live: true,
      add: false
    };
  }
  componentDidMount() {
    // console.log(ReactDOM.findDOMNode().getBoundingClientRect())
  }

  render() {
    return (
      <div>
        <Container key={this.props.key} style={{ padding: "3em 0em 0em" }}>
          <Navbar />
          <AnnouncementBoard />
        </Container>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Display);
