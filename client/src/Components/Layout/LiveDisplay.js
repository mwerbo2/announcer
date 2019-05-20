import React from "react";
import { Grid, Container } from "semantic-ui-react";
import {withRouter} from 'react-router-dom'
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
    if (this.props.backgroundImg !== prevProps.backgroundImg) {
      this.setState({backgroundImage: this.props.backgroundImg})
      }
    } 

  componentDidMount() {
    axios
    .get("/announcements/liveStatus")
    .then(announcement => {
      this.setState({
        fullAnnouncement: announcement.data,
        title: announcement.title,
        body: announcement.body
      });
    })


     axios.get("/boards")
     .then(board => {
       this.setState({
         backgroundImage: board.data[0].background_image
       })
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
    const displayStyle = {
      // backgroundColor: "#000000",
      // backgroundImage: `url(${this.props.bk})`,
      backgroundImage: `url(${this.state.backgroundImage})`,
      // opacity:'.7',
      // backgroundImage: `url(https://media.wired.com/photos/5bfedea686ef9a0ff73f01e4/master/pass/Porsche-911.jpg)`,
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
