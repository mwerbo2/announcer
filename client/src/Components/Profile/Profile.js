import React from "react";
import { Header, Search, Table, Container, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import auth0Client from "../../Auth/Auth";
import axios from "axios";
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
  }

  strip = html => {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";

    // Or Regex myString.replace(/<[^>]*>?/gm, '');
  };

  deleteAnnouncement = e => {
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
      .then(res => this.props.afterDelete())
      .catch(err => console.log(err));
    // this.props.afterDelete();
  };

  async componentDidMount() {
    const res = await axios.get("/announcements/status");
    console.log(res);
    console.log(res.data.active);

    const { data } = res.data;
    console.log("Announcements", data);
    this.setState({ posts: res.data });
    console.log(this.state.posts);
  }
  render() {
    const {
      posts: { active, inactive, scheduled }
    } = this.state;
    return (
      <div>
        <Container style={{ marginTop: "7em", minHeight: "100vh", flex: 1 }}>
          <Navbar />
          <Header>Welcome {this.props.name}</Header>
          <Search />
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
                        <Icon name="trash" onClick={this.deleteAnnouncement} />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>

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
                        <Icon name="trash" onClick={this.deleteAnnouncement} />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>

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
                        <Icon name="trash" onClick={this.deleteAnnouncement} />
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
