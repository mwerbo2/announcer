import React from "react";
import { Header, Table, Container, Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import auth0Client from "../../Auth/Auth";
import axios from "axios";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import _ from "lodash";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: "",
      activePosts: "",
      inactivePosts: "",
      scheduledPosts: "",
      table: null,
      column: null,
      direction: null
    };
  }

  strip = html => {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  fetchAnnouncements = async () => {
    const res = await axios.get("/announcements/status");
    const { active, inactive, scheduled } = res.data;
    this.setState({
      posts: res.data,
      activePosts: active,
      inactivePosts: inactive,
      scheduledPosts: scheduled
    });
  };

  handleSort = (clickedColumn, clickedTable) => () => {
    const { column, posts, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        clickedTable: _.sortBy(clickedTable, [clickedColumn]),
        direction: "ascending"
      });
      return;
    }

    this.setState({
      clickedTable: _.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
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
  };

  componentDidMount() {
    this.fetchAnnouncements();
  }

  render() {
    const {
      column,
      direction,
      activePosts,
      inactivePosts,
      scheduledPosts
    } = this.state;
    return (
      <div>
        <Container style={{ marginTop: "7em", minHeight: "100vh", flex: 1 }}>
          <Navbar />
          <SemanticToastContainer />
          <Header>Welcome</Header>
          <Header>Active</Header>
          <Table celled sortable selectable className="active">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={column === "title" ? direction : null}
                  onClick={this.handleSort("title", "activePosts")}
                >
                  Title
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "body" ? direction : null}
                  onClick={this.handleSort("body", "activePosts")}
                >
                  Body
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "dateStart" ? direction : null}
                  onClick={this.handleSort("dateStart", "activePosts")}
                >
                  Date start
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "dateEnd" ? direction : null}
                  onClick={this.handleSort("dateEnd", "activePosts")}
                >
                  Date End
                </Table.HeaderCell>
                <Table.HeaderCell>Options</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {activePosts &&
                activePosts.map(post => {
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
          <Table celled sortable selectable className="scheduled">
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
              {scheduledPosts &&
                scheduledPosts.map(post => {
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
          <Table celled sortable selectable className="inactive">
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
              {inactivePosts &&
                inactivePosts.map(post => {
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
