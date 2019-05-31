import React from "react";
import { Container } from "semantic-ui-react";
import BackgroundEditorButton from "./BackgroundEditorButton";

class EditorBarContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <Container>
        <BackgroundEditorButton
          {...this.props}
          // didOpacityUpdate={this.props.getOpacity}
          // didBackgroundUpdate={this.props.didBackgroundUpdate}
        />
      </Container>
    );
  }
}

export default EditorBarContainer;
