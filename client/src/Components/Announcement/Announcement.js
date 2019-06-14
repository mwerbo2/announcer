import React from "react";
import { Container, Grid, Icon, Modal, Ref } from "semantic-ui-react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import MaterialUIPickers from "../Announcement/DateTimePicker";
import auth0Client from "../../Auth/Auth";

class Announcement extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.saveAnnouncement = this.saveAnnouncement.bind(this);
    this.deleteAnnouncement = this.deleteAnnouncement.bind(this);
    // console.log("A.js 24", auth0Client.getProfile())
    // console.log("A.js 25", auth0Client.getIdToken())
    this.announcementRef = React.createRef();
    this.state = {
      title: "",
      body: "",
      live: true,
      target_post_id: "",
      deleted: false,
      openModal: false
    };
  }

  saveAnnouncement = () => {
    //conditional to check if null don't send
    const postId = this.props.post_id;

    if (!this.state.body) {
      axios
        .put(
          `/announcements/${postId}`,
          {
            user_id: 999999993,
            announcement_title: this.state.title,
            status: "active"
          },
          {
            headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
          }
        )
        .then(res => this.openModal(res))
        .catch(function(error) {
          console.log(error);
        });
    } else if (!this.state.title) {
      axios
        .put(
          `/announcements/${postId}`,
          {
            user_id: 999999993,
            announcement_body: this.state.body,
            status: "active"
          },
          {
            headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
          }
        )
        .then(res => this.openModal(res))
        .catch(function(error) {
          console.log(error);
        });
    } else {
      axios
        .put(
          `/announcements/${postId}`,
          {
            user_id: 999999993,
            announcement_title: this.state.title,
            announcement_body: this.state.body,
            status: "active"
          },
          {
            headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
          }
        )
        .then(res => this.openModal(res))
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  openModal = () => {
    this.setState({ openModal: true, title: "", body: "" });
  };

  closeModal = () => {
    this.props.onSave();
    this.setState({ openModal: false });
  };

  deleteAnnouncement = () => {
    axios
      .post(
        "/announcements/status",
        {
          user_id: 999992,
          id: this.props.post_id,
          status: "archive"
        },
        {
          headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
        }
      )
      .then(() => this.props.afterDelete())
      .catch(err => console.log(err));
    this.props.afterDelete();
  };

  handleTitleChange(event) {
    this.setState({ title: event });
  }
  handleBodyChange(event) {
    this.setState({ body: event });
  }

  componentDidMount() {}
  render() {
    if (!auth0Client.isAuthenticated()) {
      return (
        <Grid>
          <Grid.Row key={this.props.post_id}>
            <Grid.Column width={14}>
              <Ref innerRef={this.announcementRef}>
                <Container>
                  <div
                    ref="title"
                    name="title"
                    className="title"
                    dangerouslySetInnerHTML={{ __html: this.props.title }}
                  />
                  <div
                    name="body"
                    className="body"
                    dangerouslySetInnerHTML={{ __html: this.props.body }}
                  />
                </Container>
              </Ref>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    } else {
      return (
        <Grid>
          <Grid.Row key={this.props.post_id}>
            <Grid.Column width={14}>
              <Ref innerRef={this.announcementRef}>
                <Container>
                  <Editor
                    ref="body"
                    inline
                    apiKey="2v70mtgk4kz045dkbblsshf5xoky86546vqb4bvj4h3oaqds"
                    initialValue={this.props.title}
                    init={{
                      menubar: false
                    }}
                    plugins="link table wordcount textcolor visualblocks spellchecker"
                    toolbar="cut copy paste undo redo bold italic underline fontsizeselect forecolor backcolor align image"
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
                    init={{
                      menubar: false
                    }}
                    plugins="link table wordcount lists textcolor image"
                    toolbar="cut copy paste undo redo bold italic underline fontsizeselect forecolor backcolor align numlist bullist image"
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
                inverted
              />
              <Icon
                data-post_id={this.props.post_id}
                name="save"
                size="large"
                onClick={this.saveAnnouncement}
                inverted
              />
              <Icon
                name="calendar times outline"
                size="large"
                onClick={this.openModal}
                inverted
              />
              <Modal
                size="small"
                open={this.state.openModal}
                closeOnDimmerClick={this.closeOnDimmerClick}
                onClose={this.closeModal}
              >
                <Modal.Header>Schedule your announcement</Modal.Header>
                <Modal.Content>
                  <MaterialUIPickers
                    closeMod={this.closeModal}
                    post_id={this.props.post_id}
                  />
                </Modal.Content>
              </Modal>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
  }
}

export default Announcement;
