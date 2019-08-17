import React from "react";
import { Grid, Container, Ref } from "semantic-ui-react";
import axios from "axios";
import Announcement from "./Announcement";
import AddButton from "./AddButton";
import AnnouncementPlaceholder from "./AnnouncementPlaceholder";
import auth0Client from "../../Auth/Auth";
import { toast } from "react-semantic-toasts";

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

    this.setAnnouncementRef = element => {
      this.announcementRef = element;
    };

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.clickAdd = this.clickAdd.bind(this);
    this.getActivePosts = this.getActivePosts.bind(this);
  }

  clickAdd = () => {
    this.setState({
      add: true,
      showAddButton: false,
      savedSchedule: false
    });
  };

  handleEditorChange(content) {
    console.log('Ann.js handle editor change', content);
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
	  console.log('Ann.js UpdateAfterSave', this.state)
    this.setState({ savedSchedule: true });
    this.getActivePosts();
    this.setState({ add: false, showAddButton: true });
    this.setState({ showAddButton: true });
  };

  clickDelete = () => {
    setTimeout(() => {
      toast({
        title: "Deleted announcement"
      });
    }, 500);
    this.setState({ add: false, showAddButton: true });
  };

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
    setTimeout(() => {
      toast({
        title: "Deleted announcement"
      });
    }, 500);
    this.setState({ deleted: true });
    this.getActivePosts();
  };

  componentDidMount() {
    this.getActivePosts();
    setTimeout(() => {}, 100);
  }

  render() {
    if (!auth0Client.isAuthenticated())
      return (
        <Ref innerRef={this.announcementsRef}>
          <Container
            className="announcementsCont"
            key={this.props.key}
            style={{ padding: "3em 0em 0em" }}
          >
            <Grid>
              <Grid.Row>
                <Grid.Column width={16}>
                  {this.renderAnnouncement()}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Ref>
      );
    return (
      <Ref innerRef={this.setAnnouncementRef}>
        <Container
          className="announcementsCont"
          key={this.props.key}
          style={{ padding: "3em 0em 0em", height: "100%" }}
        >
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                {this.renderAnnouncement()}
                {this.state.showAddButton && (
                  <AddButton buttonClick={this.clickAdd} />
                )}
                {this.state.add && (
                  <AnnouncementPlaceholder
                    onDelete={this.clickDelete}
                    boardB={this.props.boardBotto}
                    onSave={this.updateAfterSave}
                  />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Ref>
    );
  }
}

export default Announcements;
