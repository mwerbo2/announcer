import React from "react";
import { Button, Container, Modal } from "semantic-ui-react";
import { SketchPicker } from "react-color";

class BackgroundEditorButton extends React.Component {
    state = {
        modalOpen:false
    };

    openModal = () => {
        this.setState({modalOpen: true})
    }

  render() {
      const {modalOpen} = this.state;
    return (
      <Container>
        <Modal open={modalOpen}>
          <Modal.Header></Modal.Header>
          <Modal.Content>
          <SketchPicker />
          </Modal.Content>
        </Modal>
        <Button onClick={this.openModal}>Edit Background</Button>
      </Container>
    );
  }
}

export default BackgroundEditorButton;
