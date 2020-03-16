import React, { createRef } from "react";
import {
  Button,
  Container,
  Modal,
  Header,
  Grid,
  Ref
} from "semantic-ui-react";
import axios from "axios";
import { toast } from "react-semantic-toasts";
import { Editor } from "@tinymce/tinymce-react";
import auth0Client from '../../Auth/Auth'
import DatePicker from "react-datepicker";

class AnnouncementModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.saveAnnouncement = this.saveAnnouncement.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.inputRef = createRef();
    this.state = {
      announcementId: "",
      modalOpen: false,
      title: "",
      body: "",
      startTime: new Date(),
      endTime: new Date()
    };
  }

  handleTitleChange(event) {
    this.setState({ title: event });
  }
  handleBodyChange(event) {
    this.setState({ body: event });
  }

  flashToast(res) {
    setTimeout(() => {
      toast({
        title: "Successfully added announcement"
      });
    }, 500);
    this.setState({  
      modalOpen: false,
      title: "",
      body: "",
      postMessage: res.statusText 
    });
  }

  openModal = () => {
    this.setState({ modalOpen: true, title: "", body: "" });
  };

  closeModal(res) {
   this.setState({ modalOpen: false, title: "", body: "" });
  };

  saveAnnouncement = () => {
    //conditional to check if null don't send
    if (!this.state.body) {
      axios
        .post(
          `/announcements/one`,
          {
            user_id: 999999993,
            announcement_title: this.state.title,
            date_time_start: this.state.startTime.toLocaleDateString(),
            date_time_end: this.state.endTime.toLocaleDateString(),
          },
          {
            headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
          }
        )
        .then(res => this.flashToast(res))
        .catch(error => this.handleError(error));
    } else if (!this.state.title) {
      axios
        .post(
          `/announcements/one`,
          {
            user_id: 999999993,
            announcement_body: this.state.body,
            date_time_start: this.state.startTime.toLocaleDateString(),
            date_time_end: this.state.endTime.toLocaleDateString(),
          },
          {
            headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
          }
        )
        .then(res => this.flashToast(res))
        .catch(error => this.handleError(error));
    } else {
      axios
        .post(
          `/announcements/one`,
          {
            user_id: 999999993,
            announcement_title: this.state.title,
            announcement_body: this.state.body,
            date_time_start: this.state.startTime.toLocaleDateString(),
            date_time_end: this.state.endTime.toLocaleDateString(),
          },
          {
            headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
          }
        )
        .then(res => {this.flashToast(res)})
        .catch(error => this.handleError(error));
    }
  };



  handleError = err => {
    if (err.response.status >= 400) {
      setTimeout(() => {
        toast({
          title: "Error scheduling announcement",
          description: "Please refresh and try again."
        });
      }, 500);
    }
  };
  // close = res => {
  //   if (res.status === 200) {
  //     setTimeout(() => {
  //       toast({
  //         title: "Background updated"
  //       });
  //     }, 500);
  //     this.setState({ modalOpen: false });
  //     const backgroundInfo = {
  //       backgroundColor: this.state.backgroundColor,
  //       backgroundImage: this.state.imageURL,
  //       backgroundOpacity: this.state.opacity
  //     };
  //     this.props.didBackgroundUpdate(backgroundInfo);
  //   } else {
  //     this.setState({ modalOpen: false });
  //     const backgroundInfo = {
  //       backgroundColor: this.state.backgroundColor,
  //       backgroundImage: this.state.imageURL,
  //       backgroundOpacity: this.state.opacity
  //     };
  //     this.props.didBackgroundUpdate(backgroundInfo);
  //   }
  // };

  handleStartDate = date => {
    this.setState({ startTime: date }, () => {console.log("line 208",this.state)});
  };
  handleEndDate = date => {
    this.setState({ endTime: date }, () => {console.log("Line 211", this.state)});
  };

  handleSelectStart = date => {
    this.setState({ startTime: date }, () => {console.log("line, 215", this.state)});
  };

  handleSelectEnd = date => {
    this.setState({ endTime: date }, () => {console.log(this.state)});
  };
  
  render() {
    const { modalOpen } = this.state;
    return (
      <Container>
        <Modal open={modalOpen}>
          <Modal.Header>Schedule future announcement</Modal.Header>
          <Modal.Content>
          <Grid>
          <Grid.Row>
            <Grid.Column width={14} >
            <Ref>
                <Container>
                  <Container style={{backgroundColor: "black", marginBottom: '15px', padding: '10px'}}>
                  
                  <Editor
                    ref="body"
                    inline
                    apiKey="2v70mtgk4kz045dkbblsshf5xoky86546vqb4bvj4h3oaqds"
                    initialValue="<h1 style='text-align: center;'><span style='text-decoration: underline; color: #ffffff'>Title</span></h1>"
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
                    initialValue="<ul class='unorderedList' style='color: #ffffff'>
                    <li class='listItem'>
                    <h3 class='messageBody' style='color: #ffffff'>Body</h3>
                    </li>
                    </ul>"
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
                  </Editor>
                  </Container>
                  <Grid columns={3}>
                    <Grid.Row>
                      <Grid.Column> 
                        <Header as="h5">Date Start</Header>
                        <DatePicker
                          selected={this.state.startTime}
                          onChange={this.handleStartDate}
                          onSelect={this.handleSelectStart}
                          minDate={new Date()}
                          dateFormat="yyyy-MM-dd"
                          key={1}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Header as="h5">Date End</Header>
                        <DatePicker
                          selected={this.state.endTime}
                          onSelect={this.handleSelectEnd}
                          onChange={this.handleEndDate}
                          dateFormat="yyyy-MM-dd"
                          minDate={new Date()}
                          key={2}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Container>
              </Ref>
            </Grid.Column>
            <Grid.Column floated="right" verticalAlign="middle" width={2}>
              <Modal
                size="small"
                open={this.state.modalOpen}
                closeOnDimmerClick={this.closeOnDimmerClick}
                onClose={this.closeModal}
              >
                <Modal.Header>Schedule your announcement</Modal.Header>
                <Modal.Content>
                </Modal.Content>
              </Modal>
            </Grid.Column>
          </Grid.Row>
        </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.closeModal} negative>
              Cancel
            </Button>
            <Button
              onClick={this.saveAnnouncement}
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
