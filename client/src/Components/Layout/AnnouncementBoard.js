import React from "react";
import { Grid, Container } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import Announcements from "../Announcement/Announcements";
import DisplayHeader from "./DisplayHeader";
import Axios from "axios";

class AnnouncementBoard extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.annRef = React.createRef();
    // this.announcementRef = React.createRef();

    this.state = {
      announcementBottom: "",
      boardBottom: "",
      backgroundColor: "#000000",
      backgroundImg:
        "https://www.solidbackgrounds.com/images/1024x768/1024x768-black-solid-color-background.jpg",
      backgroundUpdated: false
    };
    // this.boardStyle = {
    //   height: "768px",
    //   width: "1024px",
    //   margin: "0 auto",
    //   padding: "1em",
    //   backgroundColor: this.state.backgroundColor
    // };
    // console.log("ab.js 31", boardStyle.backgroundColor)
  }

  componentDidUpdate(prevProps) {
    if (this.props.backgroundColor !== prevProps.backgroundColor) {
      // const myColor = this.props.backgroundColor
      // boardStyle.backgroundColor = myColor;
      this.setState({ backgroundColor: this.props.backgroundColor });
    }

    if (this.props.backgroundImage !== prevProps.backgroundImage) {
      this.setState({ backgroundImg: this.props.backgroundImage });
    }
  }

  editBackground = () => {};
  componentDidMount() {
    Axios.get("/boards")
      .then(response =>
        this.setState({ backgroundImg: response.data[0].background_image })
      )
      .catch(error => console.log(error));

    // this.setState({backgroundColor: response.data[0].background_color})
    //Get height of announcements component
    //Check if announcements exceeds the heigh
    // const node = this.myRef.current;
    // console.log(node)
    // console.log(node.getBoundingClientRect());
    // const bott = node.getBoundingClientRect().bottom
    // // this.props.bottomNode = node.getBoundingClientRect()
    // console.log(bott)
    // this.setState({boardBottom: bott})
    // console.log(this.state.boardBottom)
    // console.log(this.myRef.current.getBoundingClientRect().height);
    // console.log(this.annRef.current);
    // console.log(this.annRef.current.getBoundingClientRect())

    // const annNode = this.announcementRef.current
    // console.log(annNode)
  }

  getAnnouncementSize() {
    // console.log(node);
    // console.log(node.getBoundingClientRect());
    // if (!node) { console.log('waiting')} else { console.log(node.getBoundingClientRect().bottom)}
    // this.setState({announcementBottom: "yes"})
  }

  render() {
    var boardStyle = {
      height: "768px",
      width: "1024px",
      margin: "0 auto",
      backgroundImage: `url(${this.state.backgroundImg})`,
      flex: 1
    };

    return (
      <div ref={this.myRef} style={boardStyle} onClick={this.editBackground}>
        <div
          style={{
            background: `rgb(0,0,0,${this.props.opacity})`,
            height: "100%",
            width: "100%",
            padding: "1em"
          }}
        >
          <Grid style={{}}>
            <DisplayHeader />
            <Grid.Row>
              <Announcements
                ref={this.annRef}
                boardBotto={this.state.boardBottom}
                getBottom={this.getAnnouncementSize}
              />
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(AnnouncementBoard);
