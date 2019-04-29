import React from "react";
import { Segment, Grid, Header } from "semantic-ui-react";
import Wysiwyg from "./Announcement/Wysiwyg";
// import Preview from './AnnouncementPreview';
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import Display from "./Layout/LiveDisplay";
import AnnouncementPlaceholder from "./Announcement/AnnouncementPlaceholder";
import axios from "axios";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      announcement: []
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/announcements`)
      .then(res => {
        const annoucements = res.data;
        this.setState({ announcement: annoucements });
        console.log("announcement api ", this.state.announcement);
      })
      .catch(error => console.log(error));
  }

  checkAnnouncementLength() {
    if (this.state.announcement.length >= 4) {
      return <Header as="h1">Too many announcements right now,</Header>;
    } else {
      // <PlaceholderAnnouncement />
    }
  }

  handleEditorChange(content) {
    this.setState({ content });
    console.log(this.state.content);
  }

  handleSubmit(e) {
    console.log(this.state.content);
    e.preventDefault();

    axios.post(`/announcements`, {});
  }

  // announcementList(){
  //    const annoucement = this.state.announcement.map((announce) => {
  //       return <Display title={announce.announcement_title} body={announce.announcement_body} />
  //     }
  //    )
  // }

  render() {
    // const annoucement = this.state.announcement.map((announce) => {
    //     console.log('announce', announce)
    //     return <Display title={announce.announcement_title} body={announce.announcement_body} />
    //   }
    //  )

    return (
      <Segment className="MainStyle" style={{ marginTop: "5em" }}>
        <Navbar />
        <Grid>
          <Grid.Row className="MainStyle">
            <Grid.Column width={8}>
              <Header as="h2" textAlign="center">
                Editor
              </Header>
              <Wysiwyg
                onEditorChange={this.handleEditorChange}
                content={this.state.content}
                onSubmit={this.onSubmit}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as="h2" textAlign="center">
                Preview
              </Header>
              <Display
                title={this.state.announcement.announcement_title}
                body={this.state.announcement.announcement_body}
              />
              {/* {annoucement} */}
              <AnnouncementPlaceholder />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Footer />
      </Segment>
    );
  }
}
export default Main;
