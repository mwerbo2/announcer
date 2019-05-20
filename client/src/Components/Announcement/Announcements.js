import React from "react";
import { Grid, Container, Ref } from "semantic-ui-react";
import axios from "axios";
// import { Editor } from '@tinymce/tinymce-react';
// import Weather from './Announcement/PreviewWeather';
// import DateTime from './Announcement/PreviewDateTime';
import Announcement from "./Announcement";
import AddButton from "./AddButton";
import AnnouncementPlaceholder from "./AnnouncementPlaceholder";
import auth0Client from "../../Auth/Auth";

class Announcements extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullAnnouncement: [],
      title: "true",
      body: "true",
      content: "",
      live: true,
      add: false,
      deleted: false,
      showAddButton: true
    };

    // this.announcementsRef = React.createRef();
    this.setAnnouncementRef = element => {
      this.announcementRef = element;
    };

    this.handleEditorChange = this.handleEditorChange.bind(this);
    // this.deleteAnnouncement = this.deleteAnnouncement.bind(this);
    this.clickAdd = this.clickAdd.bind(this);
    // this.handleEditChange = this.handleEditChange.bind(this);
    this.getActivePosts = this.getActivePosts.bind(this);
  }

  handleSubmit = () => {};

  clickAdd = () => {
    this.setState({
      add: true,
      showAddButton: false,
      savedSchedule: false
    });
  };

  handleEditorChange(content) {
    this.setState({ content });
  }

  renderAnnouncement = () => {
    return this.state.fullAnnouncement.map(announce => {
      return (
        <Announcement
          key={announce.id}
          isLive={this.state.live}
          onDelete={this.deleteAnnouncement}
          onEditorChange={this.handleEditorChange}
          post_id={announce.id}
          title={announce.announcement_title}
          body={announce.announcement_body}
          onSave={this.updateAfterSave}
          afterDelete={this.updateAfterDelete}
        />
      );
    });
  };

  updateAfterSave = () => {
    this.setState({savedSchedule: true})
    this.getActivePosts()
    this.setState({add:false, showAddButton:true, })
    this.setState({showAddButton:true});

  }

  clickDelete = () => {
    this.setState({add: false, showAddButton: true})
  }

  getActivePosts = () => {
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
  };

updateAfterDelete = () => {
  this.setState({deleted: true})
  this.getActivePosts();
}
  // deleteAnnouncement() {
  
  // }

  getBottomDimension = () => {
    // console.log(this.props.boardBotto)
    // this.props.getBottom()
    // console.log('do you even work?')
    // const node = this.announcementsRef.current
    // console.log(node)
    // const annBottom = node.getBoundingClientRect().bottom
    
    // const annBottom = !node ? " " : node.getBoundingClientRect().bottom
    // console.log(annBottom)
   //   if (!node) { console.log('waiting')} else if (this.props.boardBotto < annBottom ){
  //     console.log('too big')
  //   } else {
  //     console.log('fits ')
  //   }
  }
  

  componentDidMount() {
    // console.log(this.props.getBottom())
    
    this.getActivePosts()

    setTimeout(() => {
      // console.log(this)
      // console.log(this.announcementsRef.current.getBoundingClientRect().bottom)    
      // console.log("offset height", this.announcementsRef.offsetHeight)
  }, 100);

    //
    // console.log(ReactDOM.findDOMNode(this).offsetHeight)
    
  // console.log(this.announcementsRef.current.getBoundingClientRect())
  //   console.log(this.announcementsRef.current)
  //   console.log(this.announcementsRef.current.getBoundingClientRect())
  //   console.log(this.announcementsRef.current.clientHeight)

  }


  render() {
    if (!auth0Client.isAuthenticated())
      return (
        <Ref innerRef={this.announcementsRef}>
        <Container className='announcementsCont' key={this.props.key} style={{ padding: "3em 0em 0em" }}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>{this.renderAnnouncement()}</Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        </Ref>
      );
    return (
      // <div ref={this.setAnnouncementRef}>
      <Ref innerRef={this.setAnnouncementRef}>
      <Container className='announcementsCont' key={this.props.key} style={{ padding: "3em 0em 0em", height: "100%" }}>
      {/* <div ref={this.announcementsRef}> */}
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
                {this.renderAnnouncement()}
                {this.state.showAddButton && <AddButton buttonClick={this.clickAdd} />}
                {this.state.add && <AnnouncementPlaceholder onDelete={this.clickDelete} boardB={this.props.boardBotto} onSave={this.updateAfterSave} />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      </Ref>
      // </div>
    );
  }
}

export default Announcements;
