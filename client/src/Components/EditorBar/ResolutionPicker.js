import React, { Component } from "react";
import { Dropdown, Grid, Header } from "semantic-ui-react";

const resolutions = [
  { key: "1", text: "1024 x 768", value: "1024 x 768" },
  { key: "2", text: "1280 x 720", value: "1280 x 720" },
  { key: "3", text: "1920 x 1080", value: "1920 x 1080" }
];

class ResolutionPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { resolution: "" };
  }
  handleChange = (e, { value }) => {
    this.setState({ resolution: value });
    console.log(value);
  };

  render() {
    const { resolution } = this.state;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header>Resolution</Header>
            <Dropdown
              onChange={this.handleChange}
              options={resolutions}
              placeholder="Choose an resolution"
              selection
              value={resolution}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ResolutionPicker;
