import React from "react";
import { Container } from "semantic-ui-react";
import BackgroundEditorButton from "./BackgroundEditorButton";
import OpacityPicker from "./OpacityPicker";

const editorStyle = {
  // marginTop: "5em"
};

class EditorBarContainer extends React.Component {
  render() {
    return (
      <Container style={editorStyle}>
        <BackgroundEditorButton
          didBackgroundUpdate={this.props.didBackgroundUpdate}
        />
      </Container>
    );
  }
}

export default EditorBarContainer;
