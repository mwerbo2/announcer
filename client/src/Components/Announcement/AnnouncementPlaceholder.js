import React from "react";
import { Grid, Container, Icon, Modal, Ref } from "semantic-ui-react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import MaterialUIPickers from "../Announcement/DateTimePicker";
import auth0Client from "../../Auth/Auth";

const styles = {
  containerStyle: {
    height: "150px",
    border: "1px black solid"
  }
};

class AnnouncementPlaceholder extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.saveAnnouncement = this.saveAnnouncement.bind(this);
    this.deleteAnnouncement = this.deleteAnnouncement.bind(this);
    // this.scheduleAnnouncement = this.scheduleAnnouncement.bind(this);

    this.placeHolderRef = React.createRef();

    this.state = {
      title: "",
      body: "",
      live: true,
      post_id: "",
      new_post_id: "",
      openModal: false
    };
  }

  saveAnnouncement = e => {
    const postId = this.props.post_id;
    axios.post("/announcements",
        {
          user_id: 999999993,
          announcement_title: this.state.title,
          announcement_body: this.state.body,
          status: "active",
          announcementId: postId
        },
        {
          headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
        }
      )
      .then(response => {
        // console.log("saved ann: ", response.data[0].id);
        console.log("ap.js 52", response.data)

        this.setState({post_id: response.data.id, openModal: true, title:"", body:""})
        // console.log("state", this.state.post_id)
        // console.log(this.state.openModal);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  closeModal = () => {
    this.setState({openModal:false})
    this.props.onSave();
    // console.log(`ap.js 62 ${this.state.openModal}`);
  }


  deleteAnnouncement = (e) => {
  this.props.onDelete();

  }

  handleTitleChange(event) {
    this.setState({ title: event });
    // console.log("Updating title to: ", this.state.title);
  }
  handleBodyChange(event) {
    this.setState({ body: event });
    // console.log("Updating body to: ", this.state.body);
  }
  componentDidMount(){
    console.log(this.placeHolderRef.current.getBoundingClientRect().height);
    console.log(this.props.boardB)
    if (this.placeHolderRef.current.getBoundingClientRect().bottom < this.props.boardB) { console.log('I fit')} else { console.log('i do not fit')}
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={14}>
          <Ref innerRef={this.placeHolderRef}>
            <Container style={styles.containerStyle}>
              <Editor
                ref="body"
                inline
                apiKey="2v70mtgk4kz045dkbblsshf5xoky86546vqb4bvj4h3oaqds"
                initialValue="<h1 style='text-align: center;'><span style='text-decoration: underline; color: #ffffff'>Title</span></h1>"
                plugins="link table wordcount textcolor"
                toolbar="bold link table forecolor backcolor"
                onEditorChange={this.handleTitleChange}
                init={{browser_spellcheck: true}}
              />
              <Editor
                ref="body"
                inline
                apiKey="2v70mtgk4kz045dkbblsshf5xoky86546vqb4bvj4h3oaqds"
                initialValue="<ul>
                <li>
                <h3 style='color: #ffffff'>Body</h3>
                </li>
                </ul>"
                plugins="link table wordcount lists textcolor"
                toolbar="bold link table numlist bullist forecolor backcolor"
                onEditorChange={this.handleBodyChange}
              />
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
              type="Submit"
              name="save"
              size="large"
              onClick={this.saveAnnouncement}
            />
            <Modal
            open={this.state.openModal}            
            >
              <Modal.Header>Schedule your announcement</Modal.Header>
              <Modal.Content>
                <MaterialUIPickers closeMod={this.closeModal} post_id={this.state.post_id} />
              </Modal.Content>
            </Modal>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default AnnouncementPlaceholder;
