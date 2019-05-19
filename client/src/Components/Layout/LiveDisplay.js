import React from "react";
import { Grid, Container, Header } from "semantic-ui-react";
import {withRouter} from 'react-router-dom'
import Weather from "./PreviewWeather";
import DateTime from "./PreviewDateTime";
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
  };

  componentDidUpdate = (prevProps) => {
    console.log("LD.js 23", this.props.backgroundImg)
    if (this.props.backgroundImg !== prevProps.backgroundImg) {
      this.setState({backgroundImage: this.props.backgroundImg})
      }
      console.log("LD.js 26", this.state.backgroundImage)
    } 

  componentDidMount() {
    console.log("LD.js 28", this.props)
    axios
    .get("/announcements/liveStatus")
    .then(announcement => {
      this.setState({
        fullAnnouncement: announcement.data,
        title: announcement.title,
        body: announcement.body
      });
      console.log(this.state.fullAnnouncement);
    })



    // setInterval(() => {
    //   axios
    //   .get("/announcements/liveStatus")
    //   .then(announcement => {
    //     this.setState({
    //       fullAnnouncement: announcement.data,
    //       title: announcement.title,
    //       body: announcement.body
    //     });
    //   })
    //   .catch(error => console.log(error));
    // }, 5000);
  }

  render() {
    console.log(this.props)
    const displayStyle = {
      // backgroundColor: "#000000",
      backgroundImage: `url(${this.props.bk})`,
      backgroundImage: `url(https://media.wired.com/photos/5bfedea686ef9a0ff73f01e4/master/pass/Porsche-911.jpg)`,
      height: "768px",
      width: "1024px",
      // marginTop: 
      // padding: "3em 0em 0em"
    }
    return (
      <Container style={displayStyle} key={this.props.key}>
        <Grid>
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
    );
  }
}

export default withRouter(Display);
