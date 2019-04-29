import React from "react";
import { Button, Icon } from "semantic-ui-react";

const AddButton = props => {
  return (
    <Button icon labelPosition="left" onClick={props.buttonClick}>
      <Icon name="add" />
      Add Announcement
    </Button>
  );
};

export default AddButton;
