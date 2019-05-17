import React from "react";
import { Grid, Button, Icon, Ref } from "semantic-ui-react";
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
   console.log("ab.js 16",this.props)
    
   this.state={
      announcementBottom: "",
      boardBottom: "",
      backgroundColor: "#000000",
      backgroundImg: "https://i.imgur.com/8SnDm0P.jpg",
      backgroundUpdated: false
    }
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
    // console.log("ab.js 36", boardStyle.backgroundColor)
    if (this.props.backgroundColor != prevProps.backgroundColor) {
      // const myColor = this.props.backgroundColor
      // console.log("ab.js 48", myColor)
      // boardStyle.backgroundColor = myColor;
      this.setState({backgroundColor: this.props.backgroundColor})
    }

    if (this.props.backgroundImage != prevProps.backgroundImage) {
      this.setState({backgroundImg: this.props.backgroundImage})
    }
   }


  editBackground = () => {
      console.log("editing background")
  };
  componentDidMount() {
    
console.log("Ab.js 41", this.boardStyle);
    Axios.get('/boards')
    .then((response) => console.log(response))
    .catch((error) => console.log(error))

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
    console.log(this.myRef.current.getBoundingClientRect().height)
    console.log(this.annRef.current)
    // console.log(this.annRef.current.getBoundingClientRect())

    // const annNode = this.announcementRef.current
    // console.log(annNode)

    console.log("line 66, ab.js", this.annref)
  }

  getAnnouncementSize() {

    const node = this.announcementsRef.current;
    console.log(node)
    console.log(node.getBoundingClientRect())
    // if (!node) { console.log('waiting')} else { console.log(node.getBoundingClientRect().bottom)}
    // this.setState({announcementBottom: "yes"})
    
    
  }

  render() {

    var boardStyle = {
      height: "768px",
      width: "1024px",
      margin: "0 auto",
      padding: "1em",
      // backgroundColor: this.state.backgroundColor,
      backgroundImage: `url(${this.state.backgroundImg})`
      
    };
    
    return (
      <div ref={this.myRef} style={boardStyle} onClick={this.editBackground}>
        <Grid>
          <DisplayHeader />
          <Grid.Row>
            <Announcements ref={this.annRef} boardBotto={this.state.boardBottom} getBottom={this.getAnnouncementSize} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(AnnouncementBoard);
