import React from "react";
import {
  Container,
  Grid,
  Icon,
  Modal,
  Button,
  Image,
  Header,
  Ref
} from "semantic-ui-react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import MaterialUIPickers from "../Announcement/DateTimePicker";
import auth0Client from '../../Auth/Auth'

class Announcement extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.saveAnnouncement = this.saveAnnouncement.bind(this);
    this.deleteAnnouncement = this.deleteAnnouncement.bind(this);
    // this.scheduleAnnouncement = this.scheduleAnnouncement.bind(this);
    // console.log("A.js 24", auth0Client.getProfile())
    // console.log("A.js 25", auth0Client.getIdToken())
    this.announcementRef = React.createRef();
    this.state = {
      title: "",
      body: "",
      live: true,
      target_post_id: "",
      deleted: false,
      openModal:false
    };
  }

  saveAnnouncement = () => {
    // console.log("this 35 a.js", this)
    //conditional to check if null don't send
    
    // console.log(this.props.body)
    // console.log(this.props.post_id)
    // if (this.state)
    const postId = this.props.post_id;
    axios
      .post("/announcements", {
        user_id: 999999993,
        announcement_title: this.state.title,
        announcement_body: this.state.body,
        status: "active",
        announcementId: postId
      })
      .then((res) => this.openModal(res))
      .catch(function(error) {
        console.log(error);
      });
  };

  openModal = (res) => {
    // console.log(`a.js 57: ${res}`)
    this.setState({openModal: true, title:"", body:""})
  }

  closeModal = () => {
    this.props.onSave();
    this.setState({openModal:false})
    // console.log(`a.js 64 ${this.state.openModal}`);
  }

  deleteAnnouncement = () => {
    // console.log("a.js 68", this)
    axios
    .post("/announcements/status", {
      user_id: 999992,
      id: this.props.post_id,
      status: "archive"
    })
    .then(post => this.props.afterDelete())
    .catch(err => console.log(err));
    // this.props.onDelete();
    this.props.afterDelete();
    // this.setState({deleted:true})
  };

  handleTitleChange(event) {
    this.setState({ title: event });
    // console.log("Updating title to: ", this.state.title);
  }
  handleBodyChange(event) {
    this.setState({ body: event });
    // console.log("Updating body to: ", this.state.body);
  }

  componentDidMount() {
    const node = this.announcementRef.current;
    // console.log(node)
    // console.log(node.getBoundingClientRect());
  }
  render() {
    return (
      <Grid>
        <Grid.Row key={this.props.post_id} >
          <Grid.Column width={14}>
          <Ref innerRef={this.announcementRef}>
            <Container>
              <Editor
                ref="body"
                inline
                apiKey="2v70mtgk4kz045dkbblsshf5xoky86546vqb4bvj4h3oaqds"
                initialValue={this.props.title}
                plugins="link table wordcount"
                toolbar="bold link table"
                onEditorChange={this.handleTitleChange}
              >
                <div
                  ref="title"
                  name="title"
                  className="title"
                  dangerouslySetInnerHTML={{ __html: this.props.title }}
                />
              </Editor>
              <Editor
                ref="body"
                inline
                apiKey="2v70mtgk4kz045dkbblsshf5xoky86546vqb4bvj4h3oaqds"
                initialValue={this.props.body}
                plugins="link table wordcount lists"
                toolbar="bold link table numlist bullist"
                onEditorChange={this.handleBodyChange}
              >
                <div
                  name="body"
                  className="body"
                  dangerouslySetInnerHTML={{ __html: this.props.body }}
                />
              </Editor>
            </Container>
          </Ref>
          </Grid.Column>
          <Grid.Column floated="right" verticalAlign="middle" width={2}>
            <Icon
              name="trash alternate"
              size="large"
              onClick={this.deleteAnnouncement}
            />
            <Icon
              data-post_id={this.props.post_id}
              type="Submit"
              name="save"
              size="large"
              onClick={this.saveAnnouncement}
            />
            <Icon name="calendar times outline" size="large" />
            <Modal
              open={this.state.openModal}
              trigger={<Icon name="calendar times outline" size="large" />}
            >
              <Modal.Header>Schedule your announcement</Modal.Header>
              <Modal.Content>
                <MaterialUIPickers closeMod={this.closeModal} post_id={this.props.post_id} />
              </Modal.Content>
            </Modal>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Announcement;
