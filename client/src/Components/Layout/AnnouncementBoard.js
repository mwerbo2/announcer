import React from "react";
import { Grid, Button, Icon, Ref } from "semantic-ui-react";
import ReactDOM from 'react-dom'
import { withRouter } from "react-router-dom";
import Announcements from "../Announcement/Announcements";
import DisplayHeader from "./DisplayHeader";

const boardStyle = {
  height: "768px",
  width: "1024px",
  margin: "0 auto",
  padding: "1em",
  backgroundColor: "#000000"
};

class AnnouncementBoard extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.annRef = React.createRef();
    // this.announcementRef = React.createRef();
   
    this.state={
      announcementBottom: "",
      boardBottom: ""
    }
    // ReactDOM.findDOMNode().getBoundingClientRect()

  }

  editBackground = () => {
      console.log("editing background")
  };
  componentDidMount() {

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

  componentDidUpdate(){
    
    // console.log(this.myRef.current.getBoundingClientRect().height)
    
    // if (!this.state.boardBottom) {
    //   console.log('waiting')
    // } else {
    //   this.setState({boardBottom: "yes"})
    // }
    
  }

  render() {
    return (
      <div ref={this.myRef} style={boardStyle} onClick={this.editBackground}>
        <Grid>
          <DisplayHeader />
          <h1 style={{color:'white'}}>fuck you</h1>
          <Grid.Row>
            <Announcements ref={this.annRef} boardBotto={this.state.boardBottom} getBottom={this.getAnnouncementSize} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(AnnouncementBoard);
