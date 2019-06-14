import React from "react";
import { Dropdown } from "semantic-ui-react";

const repeatOptions = [
  { key: "1", text: "Daily", value: "daily" },
  { key: "2", text: "Weekly on this day", value: "Weekyl on this day" },
  { key: "3", text: "Monthly on this day", value: "Monthly on this day" }
];

class RepeatDropdown extends React.Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const { value } = this.state;
    return (
      <Dropdown
        onChange={this.handleChange}
        placeholder="Select repeat"
        fluid
        selection
        options={repeatOptions}
      />
    );
  }
}

export default RepeatDropdown;
