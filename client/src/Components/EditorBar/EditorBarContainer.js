import React from "react";
import { Container } from "semantic-ui-react";
import BackgroundEditorButton from "./BackgroundEditorButton";

class EditorBarContainer extends React.Component {
  render() {
    return (
      <Container>
        <BackgroundEditorButton
          didBackgroundUpdate={this.props.didBackgroundUpdate}
        />
      </Container>
    );
  }
}

export default EditorBarContainer;
