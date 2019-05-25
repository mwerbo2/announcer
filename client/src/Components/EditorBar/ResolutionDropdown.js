import React from "react";
import { Dropdown } from "semantic-ui-react";

class ResolutionDropdown extends React {
  render() {
    return (
      <Dropdown
        placeholder="Select Friend"
        fluid
        selection
        options={sizeOptions}
      />
    );
  }
}
