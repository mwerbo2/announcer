import React from "react";
import { Grid, Container } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
// import Announcement from './Announcement/PreviewAnnouncements';
import LiveAnnouncement from "../Announcement/LiveAnnouncements";
import DisplayHeader from "./DisplayHeader";
import axios from "axios";

class Display extends React.Component {
  state = {
    fullAnnouncement: [],
    title: "",
    body: "",
    backgroundImage: "",
    opacity: ".5"
  };

  componentDidUpdate = prevProps => {
    // console.log("Livedisplay 19", prevProps);
    // if (this.props.backgroundImg !== prevProps.backgroundImg) {
    //   this.setState({ backgroundImage: this.props.backgroundImg });
    // }
    if (this.props.opacity !== prevProps.opacity) {
      console.log("props lvie", this.props, "****", this.prevProps);
      this.setState({ opacity: this.props.opacity });
      console.log("state live", this.state.opacity);
    }
  };

  componentDidMount() {
    console.log("mounted", this.props);
    axios.get("/announcements/liveStatus").then(announcement => {
      this.setState({
        fullAnnouncement: announcement.data,
        title: announcement.title,
        body: announcement.body
      });
    });

    axios.get("/boards").then(board => {
      this.setState({
        backgroundImage: board.data[0].background_image
      });
    });

    setInterval(() => {
      axios
        .get("/announcements/liveStatus")
        .then(announcement => {
          this.setState({
            fullAnnouncement: announcement.data,
            title: announcement.title,
            body: announcement.body
          });
        })
        .catch(error => console.log(error));
    }, 5000);
  }

  render() {
    const background = {
      backgroundImage: `url(${this.state.backgroundImage ||
        "https://live.staticflickr.com/25/62666535_0a7513949f_b.jpg"})`,
      backgroundPosition: "center",
      height: "100vh",
      width: "100%",
      position: "fixed"
    };
    return (
      <div className="backgroundImageContainer" style={background}>
        <Container
          className="liveDisplay"
          fluid
          key={this.props.key}
          style={{
            background: `rgb(0,0,0,${this.state.opacity})`,
            height: "105vh"
          }}
        >
          <Grid className="widescreen">
            <DisplayHeader />
            <Grid.Row>
              <Grid.Column width={16}>
                {this.state.fullAnnouncement.map(announce => {
                  return (
                    <LiveAnnouncement
                      key={announce.id}
                      title={announce.announcement_title}
                      body={announce.announcement_body}
                    />
                  );
                })}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withRouter(Display);
