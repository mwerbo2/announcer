import React from "react";
import { Table } from "semantic-ui-react";
import { bgRed } from "ansi-colors";

class Table extends React.Component {
  render() {
    return (
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Options</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>First section</Table.Cell>
            <Table.Cell>Seconds section</Table.Cell>
            <Table.Cell>Third section</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}
