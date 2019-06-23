import React from "react";
import {
  Header,
  Search,
  Table,
  Container,
  Icon,
  Button
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import auth0Client from "../../Auth/Auth";
import axios from "axios";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
// import tinymce from "";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: "",
      activePosts: [],
      inactivePosts: [],
      scheduledPosts: []
    };
    // this.deleteAnnouncement = this.deleteAnnouncement.bind(this);
  }

  strip = html => {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";

    // Or Regex myString.replace(/<[^>]*>?/gm, '');
  };

  fetchAnnouncements = async () => {
    const res = await axios.get("/announcements/status");
    this.setState({ posts: res.data });
  };

  afterDelete = () => {
    setTimeout(() => {
      toast({
        title: "Deleted announcement"
      });
    }, 500);
    this.fetchAnnouncements();
  };

  deleteAnnouncement = (e, data) => {
    console.log("e", e.target);
    console.log("val", e.target.value);
    console.log("this", this);
    console.log("data", data.value);
    axios
      .post(
        "/announcements/status",
        {
          user_id: 999992,
          id: data.value,
          status: "archive"
        },
        {
          headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
        }
      )
      .then(res => this.afterDelete())
      .catch(err => console.log(err));
    // this.props.afterDelete();
  };

  componentDidMount() {
    this.fetchAnnouncements();
  }
  render() {
    const {
      posts: { active, inactive, scheduled }
    } = this.state;
    return (
      <div>
        <Container style={{ marginTop: "7em", minHeight: "100vh", flex: 1 }}>
          <Navbar />
          <SemanticToastContainer />
          <Header>Welcome</Header>
          <Header>Active</Header>
          <Table celled selectable className="active">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Body</Table.HeaderCell>
                <Table.HeaderCell>Date start</Table.HeaderCell>
                <Table.HeaderCell>Date End</Table.HeaderCell>
                <Table.HeaderCell>Options</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.posts &&
                this.state.posts.active.map(post => {
                  return (
                    <Table.Row key={post.id}>
                      <Table.Cell>
                        {this.strip(post.announcement_title)}
                      </Table.Cell>
                      <Table.Cell>
                        {this.strip(post.announcement_body)}
                      </Table.Cell>
                      <Table.Cell>{post.Schedule.date_time_start}</Table.Cell>
                      <Table.Cell>{post.Schedule.date_time_end}</Table.Cell>
                      <Table.Cell>
                        <Button
                          icon="trash"
                          value={post.id}
                          onClick={this.deleteAnnouncement}
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
          <Header>Scheduled</Header>
          <Table celled selectable className="scheduled">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Body</Table.HeaderCell>
                <Table.HeaderCell>Date start</Table.HeaderCell>
                <Table.HeaderCell>Date End</Table.HeaderCell>
                <Table.HeaderCell>Options</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.posts &&
                this.state.posts.scheduled.map(post => {
                  return (
                    <Table.Row key={post.id}>
                      <Table.Cell>
                        {this.strip(post.announcement_title)}
                      </Table.Cell>
                      <Table.Cell>
                        {this.strip(post.announcement_body)}
                      </Table.Cell>
                      <Table.Cell>{post.Schedule.date_time_start}</Table.Cell>
                      <Table.Cell>{post.Schedule.date_time_end}</Table.Cell>
                      <Table.Cell>
                        <Button
                          icon="trash"
                          value={post.id}
                          onClick={this.deleteAnnouncement}
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
          <Header>Inactive</Header>
          <Table celled selectable className="inactive">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Body</Table.HeaderCell>
                <Table.HeaderCell>Date start</Table.HeaderCell>
                <Table.HeaderCell>Date End</Table.HeaderCell>
                <Table.HeaderCell>Options</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.posts &&
                this.state.posts.inactive.map(post => {
                  return (
                    <Table.Row key={post.id}>
                      <Table.Cell>
                        {this.strip(post.announcement_title)}
                      </Table.Cell>
                      <Table.Cell>
                        {this.strip(post.announcement_body)}
                      </Table.Cell>
                      <Table.Cell>{post.Schedule.date_time_start}</Table.Cell>
                      <Table.Cell>{post.Schedule.date_time_end}</Table.Cell>
                      <Table.Cell>
                        <Button
                          icon="trash"
                          value={post.id}
                          onClick={this.deleteAnnouncement}
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Profile);
