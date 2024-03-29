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
    axios
      .post(
        "/announcements",
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
        this.setState({
          post_id: response.data.id,
          openModal: true,
          title: "",
          body: ""
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  closeModal = () => {
    this.setState({ openModal: false });
    this.props.onSave();
  };

  deleteAnnouncement = e => {
    this.props.onDelete();
  };

  handleTitleChange(event) {
    this.setState({ title: event });
  }
  handleBodyChange(event) {
    this.setState({ body: event });
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
                  init={{
                    menubar: false,
                    fontsize_formats:
                      "8px 9px 10px 11px 12px 13px 14px 15px 16px 17px 18px 20px 22px 24px 26px 28px 30px 34px 38px 42px 46px 50px"
                  }}
                  plugins="link table wordcount textcolor visualblocks spellchecker"
                  toolbar="cut copy paste undo redo bold italic underline fontsizeselect forecolor backcolor align image"
                  onEditorChange={this.handleTitleChange}
                />
                <Editor
                  ref="body"
                  inline
                  apiKey="2v70mtgk4kz045dkbblsshf5xoky86546vqb4bvj4h3oaqds"
                  initialValue="<ul style='color: #ffffff'>
                <li>
                <h3 style='color: #ffffff'>Body</h3>
                </li>
                </ul>"
                  init={{
                    menubar: false,
                    fontsize_formats:
                      "8px 9px 10px 11px 12px 13px 14px 15px 16px 17px 18px 20px 22px 24px 26px 28px 30px 34px 38px 42px 46px 50px"
                  }}
                  plugins="link table wordcount lists textcolor image"
                  toolbar="cut copy paste undo redo bold italic underline fontsizeselect forecolor backcolor align numlist bullist image"
                  onEditorChange={this.handleBodyChange}
                />
              </Container>
            </Ref>
          </Grid.Column>
          <Grid.Column floated="right" verticalAlign="middle" width={2}>
            <Icon
              name="trash alternate"
              size="large"
              onClick={this.props.onDelete}
              inverted
            />
            <Icon
              // type="Submit"
              name="save"
              size="large"
              onClick={this.saveAnnouncement}
              inverted
            />
            <Modal open={this.state.openModal} size="small">
              <Modal.Header>Schedule your announcement</Modal.Header>
              <Modal.Content>
                <MaterialUIPickers
                  closeMod={this.closeModal}
                  post_id={this.state.post_id}
                />
              </Modal.Content>
            </Modal>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default AnnouncementPlaceholder;
