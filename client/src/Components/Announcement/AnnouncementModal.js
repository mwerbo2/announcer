import React, { createRef } from "react";
import {
  Button,
  Container,
  Modal,
  Icon,
  Grid,
  Ref
} from "semantic-ui-react";
import axios from "axios";

import MaterialUIPickers from "./DateTimePicker";
import { toast } from "react-semantic-toasts";
import { Editor } from "@tinymce/tinymce-react";

class AnnouncementModal extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = createRef();
    this.state = {
      modalOpen: false,
      imageURL: "",
      backgroundColor: "",
      backgroundPosition: "center",
      opacity: 0
    };
  }

  async componentDidMount() {
    const res = await axios.get("/boards");
    this.setState({
      opacity: res.data[0].background_opacity,
      imageURL: res.data[0].background_image
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.opacity !== this.props.opacity) {
      this.setState({ opacity: this.props.opacity });
    }
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  };


  handleError = err => {
    if (err.response.status === 400) {
      setTimeout(() => {
        toast({
          title: "Error uploading image",
          description: "Check the image url"
        });
      }, 500);
      const backgroundInfo = {
        backgroundColor: this.state.backgroundColor,
        backgroundImage: this.state.imageURL
      };
      this.props.didBackgroundUpdate(backgroundInfo);
    }
  };
  close = res => {
    if (res.status === 200) {
      setTimeout(() => {
        toast({
          title: "Background updated"
        });
      }, 500);
      this.setState({ modalOpen: false });
      const backgroundInfo = {
        backgroundColor: this.state.backgroundColor,
        backgroundImage: this.state.imageURL,
        backgroundOpacity: this.state.opacity
      };
      this.props.didBackgroundUpdate(backgroundInfo);
    } else {
      this.setState({ modalOpen: false });
      const backgroundInfo = {
        backgroundColor: this.state.backgroundColor,
        backgroundImage: this.state.imageURL,
        backgroundOpacity: this.state.opacity
      };
      this.props.didBackgroundUpdate(backgroundInfo);
    }
  };

  
  render() {
    const { modalOpen, imageURL } = this.state;
    return (
      <Container>
        <Modal open={modalOpen}>
          <Modal.Header>Schedule an Announcement</Modal.Header>
          <Modal.Content>
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
                      menubar: false,
      //                 fontsize_formats:
      //                   "8px 9px 10px 11px 12px 13px 14px 15px 16px 17px 18px 20px 22px 24px 26px 28px 30px 34px 38px 42px 46px 50px",
      // content_css: "./Application.css"
      fontsize_formats: ".5vw 1vw 1.5vw 2vw 2.5vw 3vw 3.5vw 4vw 4.5vw"
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
                      menubar: false,
      //                 fontsize_formats:
      //                   "8px 9px 10px 11px 12px 13px 14px 15px 16px 17px 18px 20px 22px 24px 26px 28px 30px 34px 38px 42px 46px 50px",
      // content_css: "./Application.css"
      fontsize_formats: ".5vw 1vw 1.5vw 2vw 2.5vw 3vw 3.5vw 4vw 4.5vw"
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
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              Cancel
            </Button>
            <Button
              onClick={this.submitBackground}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Save"
            />
          </Modal.Actions>
        </Modal>
        <Button onClick={this.openModal} color="blue">
          Schedule an Announcement
        </Button>
      </Container>
    );
  }
}

export default AnnouncementModal;
