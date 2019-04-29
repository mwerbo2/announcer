import React from "react";
import { Header, Search, Table, Container } from "semantic-ui-react";
import { withRouter } from 'react-router-dom'
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

class Profile extends React.Component {
  render() {
    return (
      <div>
        <Container style={{ marginTop: "7em" }}>
          <Navbar />
          <Header>Welcome {this.props.name}</Header>
          <Search />
          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Options</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Profile);
