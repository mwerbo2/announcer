import React from "react";
import { Grid } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import Announcements from "../Announcement/Announcements";
import DisplayHeader from "./DisplayHeader";
import Axios from "axios";

class AnnouncementBoard extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.annRef = React.createRef();

    this.state = {
      announcementBottom: "",
      boardBottom: "",
      backgroundColor: "#000000",
      backgroundImg:
        "https://www.solidbackgrounds.com/images/1024x768/1024x768-black-solid-color-background.jpg",
      backgroundUpdated: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.backgroundColor !== prevProps.backgroundColor) {
      this.setState({ backgroundColor: this.props.backgroundColor });
    }

    if (this.props.backgroundImage !== prevProps.backgroundImage) {
      this.setState({ backgroundImg: this.props.backgroundImage });
    }
  }

  componentDidMount() {
    Axios.get("/boards")
      .then(response =>
        this.setState({ backgroundImg: response.data[0].background_image })
      )
      .catch(error => console.log(error));
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
